const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { postComment } = require('../controllers/comment.controller')


router.post('/', role(['admin', 'user']), postComment)

module.exports = router