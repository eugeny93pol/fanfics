const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { getPublicationsByArrayIncludeId } = require('../controllers/publication.controller')
const { savePublication } = require('../controllers/publication.controller')
const { ratePublication } = require('../controllers/rate.controller')
const { getPublications } = require('../controllers/publication.controller')
const { deletePublication } = require('../controllers/publication.controller')
const { getPublicationEdit } = require('../controllers/publication.controller')

router.get('/', getPublications)
router.get('/read/', getPublications)

router.get('/user/', role(['admin', 'user']), getPublications)
router.get('/edit/:id', role(['admin', 'user']), getPublicationEdit)
router.get('/:field/:id', getPublicationsByArrayIncludeId)
router.post('/', role(['admin', 'user']), savePublication)
router.patch('/rate/', role(['admin', 'user']), ratePublication)
router.delete('/', role(['admin', 'user']), deletePublication)

module.exports = router