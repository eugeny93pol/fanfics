const Tag = require('../models/Tag')
const mongoose = require('mongoose')

const loadTags = async (req, res) => {
    try {
        const tags = await Tag.find()
        res.status(200).json({ tags })
    } catch (e) {
        res.status(500).json({error: e})
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

module.exports = { getTags, loadTags, saveOrUpdateTags }