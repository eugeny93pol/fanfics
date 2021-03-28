module.exports = passport => {
    passport.use(require('../passport-strategies/facebook.strategy'))
    passport.use(require('../passport-strategies/vk.strategy'))
    passport.use(require('../passport-strategies/yandex.strategy'))
    passport.use(require('../passport-strategies/google.strategy'))
}