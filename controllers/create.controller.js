const Genre = require('../models/Genre')
const Tag = require('../models/Tag')


const getMeta = async (req, res) => {
    try {
        const genres = await Genre.find({}, { publications: 0 })
        const tags = await Tag.find({}, { publications: 0 })
        res.status(200).json({ genres, tags })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

module.exports = { getMeta }