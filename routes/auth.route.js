const router = require('express').Router()
const check = require('../handlers/checkFields.handler')
const passport = require('passport')
const { login, registration, checkAuth } = require('../controllers/auth.controller')

router.post('/signin', [check.email, check.password], login)
router.post('/signup', [check.name, check.email, check.password], registration)

router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        successRedirect: '/profile',
        failureRedirect: '/signin'
    }))


module.exports = router