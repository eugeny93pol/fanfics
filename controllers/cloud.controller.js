const cloudinary = require('cloudinary').v2
const errorHandler = require('../utils/errorHandler')


const getSign = async (req, res) => {
    try {
        const api_key = process.env.CLOUD_KEY
        const url = process.env.CLOUD_URL
        let timestamp = Math.round((new Date()).getTime() / 1000)
        let signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp
        }, process.env.CLOUD_SECRET)

        res.status(200).json({ url, api_key, timestamp, signature })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = { getSign }