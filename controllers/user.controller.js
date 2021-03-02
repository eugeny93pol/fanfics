const { validationResult } = require('express-validator')
const User = require('../models/User')

const getUser = async (req, res) => {
    try {
        const pageId = req.params.id
        if (pageId.length !== 24) {
            return res.status(400).json({ message: 'Incorrect ID'})
        }

        const { userId, userRole } = req.userData
        if (userId !== pageId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' })
        }

        const user = await User.findById(pageId, { password: 0 })
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        res.status(200).json({ user })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json ({
                errors: errors.array(),
                message: 'Incorrect data'
            })
        }

        const user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        user.name = req.body.name
        user.email = req.body.email
        await user.save()

        res.status(200).json({ user })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

module.exports = { getUser, updateUser }