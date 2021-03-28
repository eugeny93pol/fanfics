const router = require('express').Router()
//const passport = require('passport')
const role = require('../middleware/role.middleware')
const check = require('../utils/checkFields.handler')
const { getUser, updateUser } = require('../controllers/user.controller')


router.get('/:id', role(['user', 'admin']), getUser)
//router.get('/:id', passport.authenticate('jwt', {session: false}), getUser)
router.patch('/update', role(['user', 'admin']), [check.name, check.email], updateUser)

module.exports = router