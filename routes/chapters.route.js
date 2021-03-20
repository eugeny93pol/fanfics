const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { likeChapter } = require('../controllers/chapter.controller')

router.patch('/like/', role(['admin', 'user']), likeChapter)

module.exports = router