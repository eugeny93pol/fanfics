const Chapter = require('../models/Chapter')
const errorHandler = require('../utils/errorHandler')
const { saveOrUpdateChapters } = require('./publication.controller')
const { addToIndex } = require('./search.controller')
const { deleteChapters } = require('./publication.controller')
const { getPublicationsByArray } = require('./publication.controller')


const likeChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.body.id)
        if (chapter.likes.includes(req.body.user)) {
            chapter.likes = chapter.likes.filter(like => like != req.body.user)
        } else {
            chapter.likes.push(req.body.user)
        }
        await chapter.save()
        res.status(200).json({ chapter })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deleteChapter = async (req, res) => {
    try {
        const id = req.body._id
        const publications = await getPublicationsByArray(id, 'chapters')
        const publication = publications[0]

        publication.chapters = publication.chapters.filter(ch => ch._id.toString() !== id)
        await addToIndex(publication._id)
        await deleteChapters([id])
        await publication.save()
        res.status(200).json({ publication })
    } catch (e) {
        errorHandler(res, e)
    }
}

const updateChapter = async (req, res) => {
    try {
        const id = req.body._id
        const publications = await getPublicationsByArray(id, 'chapters')
        const publication = publications[0]

        await saveOrUpdateChapters([req.body])

        await addToIndex(publication._id)
        await publication.save()
        res.status(200).json({ publication })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { likeChapter, deleteChapter, updateChapter }