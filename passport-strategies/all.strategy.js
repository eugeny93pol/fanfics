const User = require('../models/User')
const generateAccessToken = require('../utils/generateToken')


module.exports = (provider) => async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            $or: [
                { [`${provider}_id`]: profile.id },
                { email: profile.emails[0].value }
            ]
        })
        if (user) {
            user[`${provider}_id`] = profile.id
            user.email = profile.emails[0].value
        } else {
            user = new User({
                [`${provider}_id`]: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'user'
            })
        }
        await user.save()
        const token = generateAccessToken(user._id, user.role)
        done(null, { user, token })
    } catch (e) {
        done(e, false)
    }
}