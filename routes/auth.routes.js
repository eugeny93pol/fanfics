const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const check = require('../handlers/checkFields.handler')
const { login, registration, checkAuth } = require('../controllers/auth.controller')


router.post('/signin', [check.email, check.password], login)
router.post('/signup', [check.name, check.email, check.password], registration)
router.get('/check', auth, checkAuth) ////TODO: refresh token

module.exports = router