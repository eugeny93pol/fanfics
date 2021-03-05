const {Schema, model} = require('mongoose')

const tagSchema = new Schema({
    name: { type: String, unique: true },
    publications: [{ type: Schema.Types.ObjectId, ref: 'Publication'}]
})

module.exports = model('Tag', tagSchema)