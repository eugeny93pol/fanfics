const cloudinary = require('cloudinary').v2


const getSign = async (req, res) => {
    const api_key = process.env.CLOUD_KEY
    const url = process.env.CLOUD_URL
    let timestamp = Math.round((new Date()).getTime() / 1000)
    let signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp
    }, process.env.CLOUD_SECRET)

    res.status(200).json({ url, api_key, timestamp, signature })
}

module.exports = { getSign }