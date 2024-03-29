const router = require('express').Router()
const passport = require('passport')

const authenticate = (provider) => {
    const options = { session: false }
    if (provider !== 'yandex') { options.scope = ['email'] }
    if (provider === 'google') { options.scope = options.scope.concat('profile') }
    return passport.authenticate(provider, options)
}

const cbAuthenticate = (provider) => {
    return passport.authenticate(provider, {
        session: false,
        failureRedirect: '/signin/?status=cancel'
    })
}

const cbRedirect = () => {
    return (req, res) => {
        res.redirect(`/?access_token=${req.user.token}&refresh_token=${req.user.refreshToken}`)
    }
}

router.get('/facebook', authenticate('facebook'))
router.get('/facebook/callback', cbAuthenticate('facebook'), cbRedirect())

router.get('/vk', authenticate('vkontakte'))
router.get('/vk/callback', cbAuthenticate('vkontakte'), cbRedirect())

router.get('/google', authenticate('google'))
router.get('/google/callback', cbAuthenticate('google'), cbRedirect())

router.get('/yandex', authenticate('yandex'))
router.get('/yandex/callback', cbAuthenticate('yandex'), cbRedirect())


module.exports = router