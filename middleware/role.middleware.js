const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (roles) => {
    return async (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: 's_not_authorized'})
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const id = decodedToken.userId
            const user = await User.findById(id)
            if (user.role === 'blocked') {
                return res.status(403).json({message: 's_user_blocked'})
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({message: 's_not_authorized'})
            }
            req.userData = { userId: decodedToken.userId, userRole: decodedToken.userRole }
            next()
        } catch (e) {
            res.status(401).json({message: 's_not_authorized'})
        }
    }
}