const response = (statusCode, massage, res ) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            massage: massage,
        },
        metadata: {
            prev: "",
            next: "",
            max: "",
        }
    })
}


module.exports = response;