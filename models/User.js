const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    role: { type: String, ref: 'Role' },
    vkontakte_id: { type: String },
    facebook_id: { type: String },
    google_id: { type: String },
    yandex_id: { type: String },
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement'}],
})

module.exports = model('User', userSchema)