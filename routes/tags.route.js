const { loadTags } = require('../controllers/tag.controller')
const router = require('express').Router()


router.get('/', loadTags)

module.exports = router