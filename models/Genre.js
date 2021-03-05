const {Schema, model} = require('mongoose')

const genreSchema = new Schema({
    nameEN: { type: String, unique: true, required: true },
    nameRU: { type: String, unique: true, required: true },
    publications: [{ type: Schema.Types.ObjectId, ref: 'Publication'}]
})

module.exports = model('Genre', genreSchema)