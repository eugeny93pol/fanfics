const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const generateAccessToken = require('../utils/generateToken')


const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json ({
                errors: errors.array(),
                message: 's_invalid_form_data'
            })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 's_auth_failed'})
        }

        const isMatches = await bcrypt.compare(req.body.password, user.password)
        if (!isMatches) {
            return res.status(401).json({ message: 's_auth_failed'})
        }
        if (user.role === 'blocked') {
            return res.status(401).json({ message: 's_user_blocked'})
        }

        const token = generateAccessToken(user._id, user.role)
        res.status(200).json( { token })
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
                message: 's_invalid_form_data'
            })
        }

        let candidate = await User.findOne({ email: req.body.email })
        if (candidate) {
            return res.status(400).json({message: 's_user_exists'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'user'
        })

        await user.save()

        res.status(201).json({ message: 's_user_created' })
    } catch (e) {
        errorHandler(res, e)
    }
}

const checkAuth = async (req, res) => {
    const token = generateAccessToken(req.userData.userId, req.userData.userRole)
    res.status(200).json( { token })
}

module.exports = { login, registration, checkAuth, generateAccessToken }