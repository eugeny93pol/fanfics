const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()

const {
    login,
    registration,
    checkAuth,
    checkLoginData,
    checkRegistrationData
} = require('../controllers/auth.controller')

router.post('/signin', checkLoginData, login)
router.post('/signup', checkRegistrationData, registration)
router.get('/auth', auth, checkAuth)

module.exports = router