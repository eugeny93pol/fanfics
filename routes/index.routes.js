const {Router} = require('express')
const router = Router()

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))

module.exports = router