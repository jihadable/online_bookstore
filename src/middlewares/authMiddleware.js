const { verify } = require("jsonwebtoken")

function authMiddleware(req, res, next){
    try {
        const authorization = req.header("Authorization")
        
        const token = authorization.split(" ")[1]
        
        const { id } = verify(token, process.env.JWT_SECRET)

        res.locals.customerId = id

        next()
    } catch(error){
        console.log(error)
    }
}

module.exports = authMiddleware