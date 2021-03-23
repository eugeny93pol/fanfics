const {Router} = require('express')
const router = Router()

router.use('/admin', require('./admin.route'))
router.use('/auth', require('./auth.route'))
router.use('/chapters', require('./chapters.route'))
router.use('/comments', require('./comments.route'))
router.use('/create', require('./create.route'))
router.use('/publications', require('./publications.route'))
router.use('/search', require('./search.route'))
router.use('/tags', require('./tags.route'))
router.use('/upload', require('./cloud.route'))
router.use('/upload', require('./cloud.route'))
router.use('/user', require('./user.route'))

module.exports = router