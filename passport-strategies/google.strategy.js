const GoogleStrategy = require('passport-google-oauth20').Strategy
const callbackStrategy = require('./all.strategy')

const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google/callback',
    profileFields: ['id', 'displayName', 'email']
}

module.exports = new GoogleStrategy(options, callbackStrategy('facebook'))