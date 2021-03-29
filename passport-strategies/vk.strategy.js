const VKontakteStrategy = require('passport-vkontakte').Strategy
const callbackStrategy = require('./all.strategy')


const options = {
    clientID: process.env.VK_CLIENT_ID,
    clientSecret: process.env.VK_CLIENT_SECRET,
    callbackURL: 'https://mordor-fanfics.herokuapp.com/oauth/vk/callback',
    profileFields: ['id', 'displayName', 'email'],
    lang: 'ru'
}

module.exports = new VKontakteStrategy(options, callbackStrategy('vkontakte')
)