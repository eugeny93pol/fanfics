const algoliasearch = require('algoliasearch')
const removeMd = require('remove-markdown')
const errorHandler = require('../utils/errorHandler')
const Publication = require('../models/Publication')


const client = algoliasearch(
    process.env.ALGOLIASEARCH_APPLICATION_ID,
    process.env.ALGOLIASEARCH_API_KEY
)

const globalIndex = client.initIndex('global')

const getAllPublicationsText = async () => {
    return (
        await Publication
            .find()
            .select('title description')
            .populate('author','name')
            .populate('chapters', 'title content')
            .populate('comments', 'text')
    )
}

const getOnePublicationText = async (_id) => {
    return (
        await Publication
            .findById(_id)
            .select('title description')
            .populate('author','name')
            .populate('chapters', 'title content')
            .populate('comments', 'text')
    )
}

const preparePublication = (publication) => {
    return {
        objectID: publication._id,
        title: publication.title,
        description: publication.description,
        author: publication.author.name,
        chapters: publication.chapters.map(ch => ({ title: ch.title, content: removeMd(ch.content) })),
        comments: publication.comments.map(com => com.text)
    }
}

const createIndex = async (req, res) => {
    try {
        const data = await getAllPublicationsText()
        const prepared = data.map(pub => preparePublication(pub))
        await globalIndex.saveObjects(prepared)
        res.status(200).json({message: 's:indexes_created'})
    } catch (e) { errorHandler(res, e) }
}

const addToIndex = async (_id) => {
    const publication = await getOnePublicationText(_id)
    const prepared = preparePublication(publication)
    await globalIndex.saveObject(prepared)
}

const deleteFromIndex = async (objectId) => {
    await globalIndex.deleteObject(objectId)
}

const updateIndex = async (_id) => {
    await addToIndex(_id)
}

const search = async (req, res) => {
    try {
        const textQuery = req.query.text
        const data = await globalIndex.search(textQuery)
        res.status(200).json({ result: data })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { search, createIndex, updateIndex, addToIndex, deleteFromIndex }