const jwt = require('jsonwebtoken')

const generateAccessToken = (userId, userRole) => {
    return jwt.sign(
        { userId, userRole },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
    )
}

module.exports = generateAccessToken