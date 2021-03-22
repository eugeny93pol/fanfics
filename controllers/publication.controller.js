const Publication = require('../models/Publication')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')
const { deleteRates } = require('./rate.controller')
const { deleteChapters } = require('./chapter.controller')
const { deleteTagsFromPublication } = require('./tag.controller')
const { deleteComments } = require('./comment.controller')

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
            default:
        }
        res.status(200).json({ publications })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deletePublication = async (req, res) => {
    try {
        let publication = await Publication.findById(req.body._id)

        await deleteTagsFromPublication(publication.tags)

        await deleteComments(publication.comments)

        await deleteChapters(publication.chapters)

        await deleteRates(publication.rates)

        await publication.delete()
        res.status(200).json({ message: 's:publication_removed'})
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
        skip(limit*page).select({
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

const getPublication = async (id, user) => {
    const publication =
        await Publication.
        findById(id).
        populate('author', 'name').
        populate('tags').
        populate('genres').
        populate('chapters').
        populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'name'
            }
        })

    if (mongoose.isValidObjectId(user)) {
        publication.populate({
            path: 'rates',
            match: { user: user },
            select: 'value'
        })
    }
    return publication
}

module.exports = { getPublications, deletePublication }