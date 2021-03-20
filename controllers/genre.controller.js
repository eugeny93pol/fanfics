const Genre = require('../models/Genre')
const errorHandler = require('../utils/errorHandler')

const getGenres = async () => {
    return (await Genre.find())
}

const createGenre = async (req, res) => {
    try {
        let candidate = await Genre.findOne({ $or:[{ 'name.en': req.body.en }, { 'name.ru': req.body.ru }] })
        if (candidate) {
             return res.status(400).json({message: 'That genre already exist'})
        }
        const genre = new Genre({ 'name.en': req.body.en, 'name.ru': req.body.ru })
        await genre.save()
        res.status(201).json({ message: 'Genre created', genre })
    } catch (e) {
        errorHandler(res, e)
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