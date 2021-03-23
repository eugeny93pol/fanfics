const {Schema, model} = require('mongoose')

const rateSchema = new Schema({
    publication: { type: Schema.Types.ObjectId, ref: 'Publication', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: Number, required: true },
})

module.exports = model('Rate', rateSchema)