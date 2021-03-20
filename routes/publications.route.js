const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { ratePublication } = require('../controllers/rate.controller')
const { getPublications } = require('../controllers/publication.controller')

router.get('/', getPublications)
router.get('/read/', getPublications)

router.get('/user/', role(['admin', 'user']), getPublications)
router.patch('/rate/', role(['admin', 'user']), ratePublication)

module.exports = router