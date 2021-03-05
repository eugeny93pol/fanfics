const Tag = require('../models/Tag')

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find()
        res.status(200).json({ tags })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const updateTags = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({error: e})
    }
}


module.exports = { getTags, updateTags }