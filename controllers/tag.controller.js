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
        if (mongoose.isValidObjectId(t._id)) {
            tag = await Tag.findById(t._id)
            tag.popularity++
        } else {
            tag = new Tag({name: t.name})
        }
        tags.push(await tag.save())
    }
    return tags
}

const checkChangeTags = async (tags, publication) => {
    const added = tags.filter(tag => !publication.tags.includes(tag._id))
    const removed = publication.tags.filter(id => !tags.map(tag => tag._id).includes(id.toString()))
    tags = tags.filter(tag => publication.tags.includes(tag._id))

    await deleteTagsFromPublication(removed)
    return (await tags.concat(await saveOrUpdateTags(added)))
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

module.exports = { getTags, loadTags, saveOrUpdateTags, deleteTagsFromPublication, checkChangeTags }