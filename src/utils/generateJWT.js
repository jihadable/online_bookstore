const { sign } = require("jsonwebtoken")

function generateJWT(id){
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = generateJWT