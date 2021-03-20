const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Role = require('../models/Role')
const errorHandler = require('../utils/errorHandler')

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

        const token = generateAccessToken(user._id, user.role)
        res.status(200).json( {
            userData: {
                id: user._id,
                role: user.role
            },
            token
        })
    } catch (e) {
        errorHandler(res, e)
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
        const userRole = await Role.findOne({ name: 'user'})
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: userRole.name
        })

        await user.save()

        res.status(201).json({ message: 'User created' })
    } catch (e) {
        errorHandler(res, e)
    }
}

const checkAuth = async (req, res) => {
    const token = generateAccessToken(req.userData.userId, req.userData.userRole)
    res.status(200).json( { token })
}

const generateAccessToken = (userId, userRole) => {
    return jwt.sign(
        { userId, userRole },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
    )
}

module.exports = { login, registration, checkAuth }