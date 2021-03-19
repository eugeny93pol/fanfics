const Publication = require('../models/Publication')
const { saveOrUpdateChapters } = require('./chapter.controller')
const { getGenres } = require('./genre.controller')
const { saveOrUpdateTags, getTags } = require('./tag.controller')

const getMeta = async (req, res) => {
    try {
        const genres = await getGenres()
        const tags = await getTags()
        res.status(200).json({ genres, tags })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const savePublication = async (req, res) => {
    try {
        if (req.body._id) {
            //let candidate = await Publication.findOne({email: req.body.email})
        }

        const { title, description, author, genres } = req.body

        const tags = await saveOrUpdateTags(req.body.tags)
        const chapters = await saveOrUpdateChapters(req.body.chapters, author)

        const publication = new Publication({
            title, description, author, genres,
            tags: tags.map(tag => tag._id),
            chapters: chapters.map(chapter => chapter._id)
        })



        await publication.save()
        res.status(201).json({message: 'created', publication })
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }
}

module.exports = { getMeta, savePublication }