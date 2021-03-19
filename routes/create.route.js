const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { savePublication } = require('../controllers/create.controller')
const { getMeta } = require('../controllers/create.controller')

//api/create/
router.get('/',role(['admin', 'user']), getMeta)
router.post('/', role(['admin', 'user']), savePublication)

module.exports = router