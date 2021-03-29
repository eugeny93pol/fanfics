const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { likeChapter } = require('../controllers/chapter.controller')
const { deleteChapter } = require('../controllers/chapter.controller')
const { updateChapter } = require('../controllers/chapter.controller')

router.patch('/like/', role(['admin', 'user']), likeChapter)
router.delete('/', role(['admin', 'user']), deleteChapter)
router.patch('/', role(['admin', 'user']), updateChapter)

module.exports = router