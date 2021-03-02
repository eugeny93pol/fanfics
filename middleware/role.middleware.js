const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: "No authorisation"})
            }
            const decodedToken = jwt.verify(token, config.get("jwtSecret"))
            const userRole = decodedToken.userRole
            if (!roles.includes(userRole)) {
                return res.status(403).json({message: "Not authorized"})
            }
            req.userData = { userId: decodedToken.userId, userRole: decodedToken.userRole }
            next()
        } catch (e) {
            res.status(401).json({message: "Auth failed"})
        }
    }
}