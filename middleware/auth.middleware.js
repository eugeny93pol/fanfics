const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            req.userData = { userRole: 'guest' }
        } else {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.userData = { userId: decodedToken.userId, userRole: decodedToken.userRole }
        }
        console.log(req.userData)
        next()
    } catch (e) {
        res.status(401).json({message: "s:auth_failed"})
    }
}