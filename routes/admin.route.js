const router = require('express').Router()
const role = require('../middleware/role.middleware')

const { createGenre } = require('../controllers/genre.controller')
const { getUsers } = require('../controllers/user.controller')

router.post('/create/genre', role(['admin']), createGenre)
router.get('/users/', role(['admin']), getUsers)

module.exports = router