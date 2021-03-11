const Role = require('../models/Role')

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        res.status(200).json({ roles })
    } catch (e) {
        res.status(500).json({error: e})
    }
}

module.exports = { getRoles }