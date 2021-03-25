const JwtStrategy = require('passport-jwt').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const facebookOptions = {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "api/auth/facebook/callback"
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('role')
                if (user && user.role !== 'blocked') {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )

    passport.use(
        new FacebookStrategy(facebookOptions, async (accessToken, refreshToken, profile, done) => {
            try {
                //const user = await User.findById(payload.userId).select('role')
                console.log(accessToken)
                console.log(refreshToken)
                console.log(JSON.stringify(profile))
                done(null, {accessToken, refreshToken, profile})
            } catch (e) {
                console.log(e)
            }
        })
    )
}

//module.exports authenticateJwt = passport.authenticate('jwt', {session: false})