const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    publication: { type: Schema.Types.ObjectId, ref: 'Publication', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
})

module.exports = model('Comment', commentSchema)