const { validationResult } = require('express-validator')
const User = require('../models/User')
const Role = require('../models/Role')
const errorHandler = require('../utils/errorHandler')

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
        errorHandler(res, e)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({},{
            password: 0,
            achievements: 0,
            like: 0,
            rate: 0
        })
        res.status(200).json({ users })
    } catch (e) {
        console.log(e)
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
        errorHandler(res, e)
    }
}

const updateUsersRoles = async (req, res) => {
    try {
        const role = await Role.findOne({ name: req.body.role })
        if (!role) {
            return res.status(400).json({ message: 'Incorrect request data' })
        }
        const result = await User.updateMany({_id: {$in: req.body.usersIds}}, {role: role.name})
        res.status(200).json({ message: `Updated ${result.n} users` })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deleteUsers = async (req, res) => {
    try {
        const result = await User.deleteMany({_id: {$in: req.body.usersIds}})
        res.status(200).json({ message: `Deleted ${result.n} users` })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { getUser, getUsers, updateUser, updateUsersRoles, deleteUsers }