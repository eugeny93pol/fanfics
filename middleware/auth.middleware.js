const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, config.get("jwtSecret"))
        req.userData = { userId: decodedToken.userId, userRole: decodedToken.role }
        next()
    } catch (e) {
        res.status(401).json({message: "Auth failed"})
    }
}