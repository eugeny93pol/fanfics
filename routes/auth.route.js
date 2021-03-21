const router = require('express').Router()
const check = require('../handlers/checkFields.handler')
const { login, registration, checkAuth } = require('../controllers/auth.controller')


router.post('/signin', [check.email, check.password], login)
router.post('/signup', [check.name, check.email, check.password], registration)

module.exports = router