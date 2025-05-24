const generateJWT = require("../utils/generateJWT")

class CustomerHandler {
    constructor(service, cartService){
        this._service = service
        this._cartService = cartService

        this.postCustomer = this.postCustomer.bind(this)
        this.verifyCustomer = this.verifyCustomer.bind(this)
    }

    async postCustomer(req, res){
        const { name, email, password, address, phone } = req.body
        const customerId = await this._service.addCustomer({ name, email, password, address, phone })
        await this._cartService.addCart(customerId)
        const jwt = generateJWT(customerId)

        return res.status(201).json({
            token: jwt
        })
    }

    async verifyCustomer(req, res){
        const { email, password } = req.body 
        const customerId = await this._service.verifyCustomer(email, password)
        const jwt = generateJWT(customerId)

        return res.status(200).json({
            token: jwt
        })
    }
}

module.exports = CustomerHandler