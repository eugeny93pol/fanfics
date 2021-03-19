const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { getPublications } = require('../controllers/publication.controller')

router.get('/',role(['admin', 'user']), getPublications)
router.get('/read/', getPublications)
//router.post('/', role(['admin', 'user']), )

module.exports = router