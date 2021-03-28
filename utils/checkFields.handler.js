const { check } = require('express-validator')

const checkFields = {
    name: check('name', 'Empty name').notEmpty(),
    email: check('email', 'Incorrect email').isEmail(),
    password: check('password', 'Short password').isLength( {
        min: process.env.MIN_PASSWORD_LENGTH
    })
}

module.exports = checkFields