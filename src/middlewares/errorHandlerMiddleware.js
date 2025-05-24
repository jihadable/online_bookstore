function errorHandlerMiddleware(err, _, res, _){
    // console.error(err)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        status: "fail",
        message,
    })
}

module.exports = errorHandlerMiddleware