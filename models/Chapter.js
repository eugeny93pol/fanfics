const {Schema, model} = require('mongoose')

const chapterSchema = new Schema({
    title: { type: String },
    content: { type: String },
    files: [{ type: String }],
    publication: { type: Schema.Types.ObjectId, ref: 'Publication' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
})
chapterSchema.index({ title: 'text', content: 'text' })
module.exports = model('Chapter', chapterSchema)