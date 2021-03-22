const Publication = require('../models/Publication')
const User = require('../models/User')
const { saveOrUpdateChapters } = require('./chapter.controller')
const { getGenres } = require('./genre.controller')
const { saveOrUpdateTags, getTags } = require('./tag.controller')
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

const savePublication = async (req, res) => {

    try {
        const { title, description, author, genres } = req.body

        const tags = await saveOrUpdateTags(req.body.tags)
        const chapters = await saveOrUpdateChapters(req.body.chapters, author)

        const publication = new Publication({
            title, description, author, genres,
            tags: tags.map(tag => tag._id),
            chapters: chapters.map(chapter => chapter._id)
        })

        // const user = await User.findById(author)
        // user.publications.push(publication)

        await publication.save()
        // await user.save()
        res.status(201).json({message: 's:publication_created', publication })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { getMeta, savePublication }