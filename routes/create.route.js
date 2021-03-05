const router = require('express').Router()
const auth = require('../middleware/auth.middleware')

const { getMeta } = require('../controllers/create.controller')

//api/create/
router.get('/', auth, getMeta)

module.exports = router