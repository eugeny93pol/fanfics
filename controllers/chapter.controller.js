const Chapter = require('../models/Chapter')
const mongoose = require('mongoose')


const saveOrUpdateChapters = async (data, author) => {
    const chapters = []
    for(const ch of data) {
        let chapter
        if (mongoose.isValidObjectId(ch._id)) {
            chapter = await Chapter.findById(ch._id)
            chapter.updated = Date.now()
        } else {
            chapter = new Chapter()
            chapter.author = author
        }
        chapter.title = ch.title
        chapter.content = ch.content
        chapter.imageUri = ch.imageUri
        chapters.push(await chapter.save())
    }
    return chapters
}

const changeChapter = async (req, res) => {
    try {
        let chapter
        switch (true) {
            case !!req.query.like:
                chapter = await likeChapter(req.query.like, req.body.user)
                break
            default:
                console.log('default')
        }


        res.status(200).json({ chapter })
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }
}

const likeChapter = async (id, user) => {
    const chapter = await Chapter.findById(id)
    if (chapter.likes.includes(user)) {
        chapter.likes = chapter.likes.filter(like => like != user)
    } else {
        chapter.likes.push(user)
    }
    await chapter.save()
    return chapter
}

module.exports = { saveOrUpdateChapters, changeChapter }