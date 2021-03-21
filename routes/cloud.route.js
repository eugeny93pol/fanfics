const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { getSign } = require('../controllers/cloud.controller')


router.get('/', role(['admin', 'user']), getSign)

module.exports = router