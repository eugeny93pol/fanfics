const router = require('express').Router()
const { createIndex } = require('../controllers/search.controller')
const { search } = require('../controllers/search.controller')
const role = require('../middleware/role.middleware')


router.get('/', search)
router.get('/create',role(['admin']), createIndex)

module.exports = router