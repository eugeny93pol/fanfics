const TwitterStrategy = require('passport-twitter').Strategy
const callbackStrategy = require('./all.strategy')

const options = {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/oauth/twitter/callback",
    profileFields: ['id', 'displayName', 'email']
}

module.exports = new TwitterStrategy(options, callbackStrategy('twitter'))