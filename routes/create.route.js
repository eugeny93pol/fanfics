const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { getMeta } = require('../controllers/create.controller')


router.get('/',role(['admin', 'user']), getMeta)

module.exports = router