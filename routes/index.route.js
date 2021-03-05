const {Router} = require('express')
const router = Router()

router.use('/admin', require('./admin.route'))
router.use('/auth', require('./auth.route'))
router.use('/create', require('./create.route'))
router.use('/user', require('./user.route'))

module.exports = router