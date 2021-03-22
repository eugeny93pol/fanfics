const Tag = require('../models/Tag')
const mongoose = require('mongoose')
const errorHandler = require('../utils/errorHandler')

const loadTags = async (req, res) => {
    try {
        const tags = await Tag.find()
        res.status(200).json({ tags })
    } catch (e) {
        errorHandler(res, e)
    }
}

const getTags = async () => {
    return (await Tag.find())
}

const saveOrUpdateTags = async (data) => {
    const tags = []
    for(const t of data) {
        let tag
        if (mongoose.isValidObjectId(t.id)) {
            tag = await Tag.findById(t.id)
            tag.popularity++
        } else {
            tag = new Tag({name: t.name})
        }
        tags.push(await tag.save())
    }
    return tags
}

const deleteTagsFromPublication = async (data) => {
    let count = 0
    for(const id of data) {
        let tag = await Tag.findById(id)
        tag.popularity > 1 ? tag.popularity-- : 0
        await tag.save()
        count++
    }
    return count
}

module.exports = { getTags, loadTags, saveOrUpdateTags, deleteTagsFromPublication }