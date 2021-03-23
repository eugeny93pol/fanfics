const { createIndex } = require('../controllers/search.controller')
const { search } = require('../controllers/search.controller')
const router = require('express').Router()


router.get('/', search)
router.get('/create', createIndex)

module.exports = router