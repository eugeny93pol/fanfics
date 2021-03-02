const router = require('express').Router()
const role = require('../middleware/role.middleware')
const check = require('../handlers/checkFields.handler')
const { getUser, updateUser } = require('../controllers/user.controller')


router.get('/:id', role(['user', 'admin']), getUser)
router.patch('/update', role(['user', 'admin']), [check.name, check.email], updateUser)

module.exports = router