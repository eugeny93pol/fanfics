const Role = require('../models/Role')
const errorHandler = require('../utils/errorHandler')

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        res.status(200).json({ roles })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { getRoles }