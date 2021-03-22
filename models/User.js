const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String }, //users from vk dont have password and email
    role: { type: String, ref: 'Role' },
    vkid: { type: String },
    fbid: { type: String },
    twid: { type: String },
    //publications: [{ type: Schema.Types.ObjectId, ref: 'Publication'}],
    //like: [{ type: Schema.Types.ObjectId, ref: 'Chapter'}], //remove
    //rate: [{ type: Schema.Types.ObjectId, ref: 'Rate'}], //remove
    //comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement'}],
})

module.exports = model('User', userSchema)