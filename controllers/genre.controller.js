const Genre = require('../models/Genre')

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find()
        res.status(200).json({ genres })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const createGenre = async (req, res) => {
    try {
        let candidate = await Genre.findOne({ $or:[{ nameEN: req.body.nameEN }, { nameRU: req.body.nameRU }] })
        if (candidate) {
             return res.status(400).json({message: 'That genre already exist'})
        }

        const genre = new Genre({ nameEN: req.body.nameEN, nameRU: req.body.nameRU })
        await genre.save()
        res.status(201).json({ message: 'Genre created', genre })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const updateGenre = async (genreId, publicationId, option) => {
    try {
        const genre = await Genre.findById(genreId)
        if (!genre) return { result: false, message: `Genre ${genreId} not found`}

        option ?
            genre.publications.push(publicationId) :
            genre.publications = genre.publications.filter(item => item._id !== publicationId)

        await genre.save()
        return { result: true, genre }
    } catch (e) {
        return { result: false, message: e.message }
    }
}
module.exports = { createGenre, updateGenre, getGenres }