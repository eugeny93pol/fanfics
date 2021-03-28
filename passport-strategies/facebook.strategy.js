const FacebookStrategy = require('passport-facebook').Strategy
const callbackStrategy = require('./all.strategy')

const options = {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: '/oauth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}

module.exports = new FacebookStrategy(options, callbackStrategy('facebook'))