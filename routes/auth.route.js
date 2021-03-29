const router = require('express').Router()
const check = require('../utils/checkFields.handler')
const { login, registration, refreshToken } = require('../controllers/auth.controller')
const auth = require('../middleware/auth.middleware')

router.post('/signin', [check.email, check.password], login)
router.post('/signup', [check.name, check.email, check.password], registration)
router.post('/refresh', auth, refreshToken)

module.exports = router