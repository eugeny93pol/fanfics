const {Schema, model} = require('mongoose')

const tagSchema = new Schema({
    name: { type: String, unique: true, required: true },
    popularity: { type: Number, default: 1 }
})

module.exports = model('Tag', tagSchema)