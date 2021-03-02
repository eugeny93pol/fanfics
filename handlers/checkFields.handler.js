const { check } = require('express-validator')
const config = require('config')

const checkFields = {
    name: check('name', 'Empty name').notEmpty(),
    email: check('email', 'Incorrect email').isEmail(),
    password: check('password', 'Short password').isLength( {min: config.get('passwordLength')})
}

module.exports = checkFields