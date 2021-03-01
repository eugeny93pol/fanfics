const {check, validationResult} = require('express-validator')
const config = require('config')
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json ({
                errors: errors.array(),
                message: 'Login data is incorrect'
            })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 'Auth failed'})
        }

        const isMatches = await bcrypt.compare(req.body.password, user.password)
        if (!isMatches) {
            return res.status(401).json({ message: 'Auth failed'})
        }

        const token = generateToken(user._id, user.role)
        res.status(200).json( {
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Registration data is incorrect'
            })
        }

        let candidate = await User.findOne({email: req.body.email})
        if (candidate) {
            return res.status(400).json({message: 'User with this email already exists'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userRole = await Role.findOne({ name: 'admin'})
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: userRole.name
        })
        userRole.users.push(user._id)

        await user.save()
        await userRole.save()

        res.status(201).json({ message: 'User created' })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const checkAuth = async (req, res) => {
    const token = generateToken(req.userData.userId, req.userData.userRole)
    res.status(200).json( { token })
}

const generateToken = (userId, userRole) => {
    return jwt.sign(
        { userId, userRole },
        config.get('jwtSecret'),
        { expiresIn: config.get('expiresToken') }
    )
}

const checkLoginData = [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Empty password').notEmpty()
]

const checkRegistrationData = [
    check('name', 'Empty name').notEmpty(),
    check('email', 'Incorrect email ').isEmail(),
    check('password', 'Short password').isLength( {min: config.get('passwordLength')})
]

module.exports = { login, registration, checkAuth, checkLoginData, checkRegistrationData }