const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.body.refreshToken
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedToken.type !== 'refresh') {
            return res.status(401).json({message: 's_not_authorized'})
        }
        const user = await User.findById(decodedToken.userId)
        if (user.role === 'blocked') {
            return res.status(403).json({message: 's_user_blocked'})
        }
        req.userData = { userId: decodedToken.userId, userRole: decodedToken.userRole }
        next()
    } catch (e) {
        res.status(401).json({ message: 's_not_authorized' })
    }
}