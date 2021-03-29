const jwt = require('jsonwebtoken')

const generateAccessToken = (userId, userRole) => {
    return jwt.sign(
        { userId, userRole },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
    )
}

const generateRefreshToken = (userId, userRole) => {
    return jwt.sign(
        { userId, userRole, type: 'refresh' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_REFRESH_TOKEN }
    )
}

module.exports = { generateAccessToken, generateRefreshToken }