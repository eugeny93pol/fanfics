const mongoose = require('mongoose')
const Publication = require('../models/Publication')
const Chapter = require('../models/Chapter')
const Comment = require('../models/Comment')
const errorHandler = require('../utils/errorHandler')

const algoliasearch = require('algoliasearch')

const client = algoliasearch('TENFJKMODS', 'aaf1be4e6152e5112a7372ea04cc9325')

const index = client.initIndex('chapters')

const createIndex = async (req, res) => {
    try {
        const chapters = await Chapter.find().select('title content')

        const reorganised = chapters.map(ch => ({
            _id: ch._id,
            title: ch.title,
            content: ch.content,
            objectID: ch._id
        }))

        await index.saveObjects(reorganised)

        res.status(200).json({message: 's:index_created', reorganised})
    } catch (e) {
        errorHandler(res, e)
    }
}




const search = async (req, res) => {
    try {
        const textQuery = req.query.text
        const data = await index.search(textQuery)
        res.status(200).json({ data })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { search, createIndex }