module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        message: 's_server_internal_error',
        description: error.message ? error.message : error
    })
}