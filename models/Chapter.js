const {Schema, model} = require('mongoose')

const chapterSchema = new Schema({
    title: { type: String },
    content: { type: String },
    imageUri: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
})
module.exports = model('Chapter', chapterSchema)