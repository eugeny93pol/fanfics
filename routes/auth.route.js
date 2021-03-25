const router = require('express').Router()
const check = require('../handlers/checkFields.handler')
const { login, registration, checkAuth } = require('../controllers/auth.controller')

//const passport = require('passport')

router.post('/signin', [check.email, check.password], login)
router.post('/signup', [check.name, check.email, check.password], registration)

// router.get('/facebook', passport.authenticate('facebook'))
// router.get('/facebook/callback',
//     passport.authenticate('facebook', {
//         session: false,
//         successRedirect: '/profile',
//         failureRedirect: '/signin'
//     }))
//

module.exports = router