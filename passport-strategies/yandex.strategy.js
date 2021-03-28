const YandexStrategy = require('passport-yandex').Strategy
const callbackStrategy = require('./all.strategy')


const options = {
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: '/oauth/yandex/callback',
}

module.exports = new YandexStrategy(options, callbackStrategy('yandex')
)