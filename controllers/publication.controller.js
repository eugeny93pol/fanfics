const Publication = require('../models/Publication')
const Chapter = require('../models/Chapter')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')
const { addToIndex } = require('./search.controller')
const { updateIndex } = require('./search.controller')
const { deleteFromIndex } = require('./search.controller')
const { checkChangeTags } = require('./tag.controller')
const { saveOrUpdateTags } = require('./tag.controller')
const { deleteRates } = require('./rate.controller')
const { deleteTagsFromPublication } = require('./tag.controller')
const { deleteComments } = require('./comment.controller')


const checkDuplicate = async (req) => {
    const {author, title, _id } = req.body
    const duplicate = await Publication.findOne({author, title})
    if (duplicate && duplicate._id != _id) {
        return true
    }
    return false
}

const savePublication = async (req, res) => {
    try {
        const isDuplicate = await checkDuplicate(req)
        if (isDuplicate) {
            return res.status(400).json({message: 's_duplicate_title'})
        }
        let publication
        if (!mongoose.isValidObjectId(req.body._id)) {
            publication = await createPublication(req.body)
            await addToIndex(publication._id)
            return res.status(201).json({message: 's_publication_created', publication })
        } else {
            await updatePublication(req, res)
            await updateIndex(req.body._id)
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

const saveOrUpdateChapters = async (data) => {
    const chapters = []
    for(const ch of data) {
        let chapter
        if (mongoose.isValidObjectId(ch._id)) {
            chapter = await Chapter.findById(ch._id)
            if (chapter.title !== ch.title ||
                chapter.content !== ch.content ||
                chapter.files.join() !== ch.files.join()
            ) {
                chapter.updated = Date.now()
            }
        } else {
            chapter = new Chapter()
        }
        chapter.title = ch.title
        chapter.content = ch.content
        chapter.files = ch.files
        chapters.push(await chapter.save())
    }
    return chapters
}

const deleteChapters = async (chapters) => {
    const result = await Chapter.deleteMany({_id: {$in: chapters}})
    return result.n
}

const checkChangeChapters = async (chapters, publication) => {
    const removed = publication.chapters
        .filter(id => !chapters.map(ch => ch._id)
            .includes(id.toString()))
    await deleteChapters(removed)
    return (await saveOrUpdateChapters(chapters))
}

const createPublication = async (data) => {
    const { title, description, author, genres } = data
    const tags = await saveOrUpdateTags(data.tags)
    const chapters = await saveOrUpdateChapters(data.chapters)
    let publication = new Publication({
        title, description, author,
        genres: genres.map(genre => genre._id),
        tags: tags.map(tag => tag._id),
        chapters: chapters.map(chapter => chapter._id)
    })
    publication = await publication.save()

    return publication
}

const updatePublication = async (req, res) => {
    try {
        const { _id, title, description, genres } = req.body
        const publication = await Publication.findById(_id)
        const tags = await checkChangeTags(req.body.tags, publication)
        const chapters = await checkChangeChapters(req.body.chapters, publication)

        publication.title = title
        publication.description = description
        publication.genres = genres.map(genre => genre._id)
        publication.tags = tags.map(tag => tag._id)
        publication.chapters = chapters.map(chapter => chapter._id)
        publication.updated = Date.now()
        await publication.save()

        return res.status(200).json({message: 's_publication_updated', publication })
    } catch (e) { errorHandler(res, e) }
}

const getPublications = async (req, res) => {
    try {
        let publications
        switch (true) {
            case !!req.query.sort:
                publications = await getSortedPublications(req.query)
                break
            case !!req.query.id:
                publications = await getPublication(req.query.id, req.query.user)
                break
            case !!req.query.user:
                publications = await getUserPublications(req.query.user)
                break
            case !!req.query.edit:
                publications = await getPublicationEdit(req.query.edit)
                break
            default:
                res.status(400).json({message: 's_bad_request'})
        }
        res.status(200).json({ publications })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.body._id)

        await deleteTagsFromPublication(publication.tags)
        await deleteComments(publication.comments)
        await deleteChapters(publication.chapters)
        await deleteRates(publication.rates)
        await deleteFromIndex(publication._id)
        await publication.delete()
        res.status(200).json({ message: 's_publication_removed'})
    } catch (e) {
        errorHandler(res, e)
    }
}

const getSortedPublications = async (query) => {
    const limit = query.limit ? Number.parseInt(query.limit, 10) : 5
    const order = query.order ? Number.parseInt(query.order, 10) : -1
    const page = query.p ? Number.parseInt(query.p, 10) : 0
    const sort = query.sort ? query.sort : '_id'
    return (
        await Publication.find().
        sort({[sort]: order}).
        limit(limit).
        skip(limit*page).
        select({
            title: 1,
            description: 1,
            updated: 1,
            averageRating: 1,
            comments: 1
        }).
        populate('author', 'name').
        populate('tags').
        populate('genres')
    )
}

const getUserPublications = async (id) => {
    return  (
        await Publication.
        find({author: id}).
        populate('author', 'name').
        populate('tags').
        populate('genres').
        populate('rates')
    )
}

const getPublicationsByArray = async (id, field) => {
    return ( await Publication.
        find({[field]: { $in: [id] }}).
        populate('author', 'name').
        populate('tags').
        populate('genres').
        populate('rates'))
}

const getPublicationsByArrayIncludeId = async (req, res) => {
    try {
        const id = req.params.id
        const field = req.params.field
        const publications = await getPublicationsByArray(id, field)
        res.status(200).json({ publications })
    } catch (e) { errorHandler(res, e) }
}

const getPublication = async (id, user) => {
    const publication =
        await Publication.
        findById(id).
        populate('author', 'name').
        populate('tags').
        populate('genres').
        populate({
            path: 'rates',
            select: 'value user'
        }).
        populate('chapters').
        populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'name'
            }
        })

    if (mongoose.isValidObjectId(user)) {
        publication.rates = publication.rates.filter(rate => rate.user.toString() === user)
    }
    return publication
}

const getPublicationEdit = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 's_incorrect_id'})
        }

        const publication = await Publication.
            findById(id).
            select('title description author').
            populate('tags').
            populate('genres').
            populate('chapters', 'title content files')

        const { userId, userRole } = req.userData
        if (userId != publication.author && userRole !== 'admin') {
            return res.status(403).json({ message: 's_not_authorized' })
        }

        res.status(200).json({ publication })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = {
    savePublication,
    getPublications,
    deletePublication,
    getPublicationEdit,
    getPublicationsByArray,
    getPublicationsByArrayIncludeId,
    saveOrUpdateChapters,
    deleteChapters
}