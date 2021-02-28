const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')


const User = require('../models/User')

const router = Router()

router.post('/signup', [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Enter password more than 6 character').isLength( {min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Registration data is incorrect'
            })
        }

        let regUser = await User.findOne({email: req.body.email})
        if (regUser) {
            return res.status(400).json({message: 'User with this email already exists'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({ userId: user._id })
    } catch (e) {
        res.status(500).json({error: e})
    }
})

router.post("/signin", [
    check('email', 'Incorrect email address').isEmail(),
    check('password', 'Enter password').exists()
    ],
    async (req, res) => {
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

            const token = jwt.sign(
                { email: user.email, userId: user._id},
                config.get('jwtSecret'),
                { expiresIn: config.get('expiresToken') }
                )

            res.status(200).json( {
                userId: user._id,
                token
            })

        } catch (e) {
            res.status(500).json({error: e})
        }
    })

module.exports = router