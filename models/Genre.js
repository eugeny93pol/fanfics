const {Schema, model} = require('mongoose')

const genreSchema = new Schema({
    name: {
        en: { type: String, unique: true, required: true },
        ru: { type: String, unique: true, required: true }
    }
})

module.exports = model('Genre', genreSchema)