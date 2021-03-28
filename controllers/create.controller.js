const { getGenres } = require('./genre.controller')
const { getTags } = require('./tag.controller')
const errorHandler = require('../utils/errorHandler')

const getMeta = async (req, res) => {
    try {
        const genres = await getGenres()
        const tags = await getTags()
        res.status(200).json({ genres, tags })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { getMeta }