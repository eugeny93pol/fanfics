const router = require('express').Router()
const role = require('../middleware/role.middleware')
const { deleteUsers } = require('../controllers/user.controller')
const { updateUsersRoles } = require('../controllers/user.controller')
const { createGenre } = require('../controllers/genre.controller')
const { getUsers } = require('../controllers/user.controller')

router.post('/create/genre', role(['admin']), createGenre)
router.get('/users', role(['admin']), getUsers)
router.patch('/update', role(['admin']), updateUsersRoles)
router.delete('/delete', role(['admin']), deleteUsers)

module.exports = router