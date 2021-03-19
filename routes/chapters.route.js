const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { changeChapter } = require('../controllers/chapter.controller')

router.patch('/', role(['admin', 'user']), changeChapter)

module.exports = router