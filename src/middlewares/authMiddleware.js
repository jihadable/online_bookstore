const { verify } = require("jsonwebtoken")
const UnauthorizeError = require("../exception/UnauthorizeError")

function authMiddleware(req, res, next){
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            const error = new UnauthorizeError("Token tidak ditemukan")
            
            return res.status(error.statusCode).json({
                status: "fail",
                message: error.message
            })
        }
        
        const token = authorization.split(" ")[1]

        if (!token){
            const error = new UnauthorizeError("Token tidak ditemukan")
            
            return res.status(error.statusCode).json({
                status: "fail",
                message: error.message
            })
        }
        
        const { id } = verify(token, process.env.JWT_SECRET)

        res.locals.customerId = id

        next()
    } catch(error){
        console.log(error)
    }
}

module.exports = authMiddleware