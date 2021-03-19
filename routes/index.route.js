const {Router} = require('express')
const router = Router()

router.use('/admin', require('./admin.route'))
router.use('/auth', require('./auth.route'))
router.use('/create', require('./create.route'))
router.use('/user', require('./user.route'))
router.use('/publications', require('./publications.route'))
router.use('/chapters', require('./chapters.route'))

module.exports = router