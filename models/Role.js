const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
    name: { type: String, unique: true, default: 'user' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
})

module.exports = model('Role', roleSchema)