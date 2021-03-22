const Chapter = require('../models/Chapter')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')


const saveOrUpdateChapters = async (data, author) => {
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
            chapter.author = author
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

module.exports = { saveOrUpdateChapters, likeChapter, deleteChapters, checkChangeChapters }