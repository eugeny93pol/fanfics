const {Schema, model} = require('mongoose')

const genreSchema = new Schema({
    name: {
        en: { type: String, unique: true, required: true },
        ru: { type: String, unique: true, required: true }
    },
    //publications: [{ type: Schema.Types.ObjectId, ref: 'Publication'}]
})

module.exports = model('Genre', genreSchema)