const {Schema, model} = require('mongoose')

const publicationSchema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag'}],
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter'}],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    //rating: [{user: , value: }]
    averageRating: { type: Number }
})
module.exports = model('Publication', publicationSchema)