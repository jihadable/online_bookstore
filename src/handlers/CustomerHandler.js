const generateJWT = require("../utils/generateJWT")

class CustomerHandler {
    constructor(service, cartService, validator){
        this._service = service
        this._cartService = cartService
        this._validator = validator

        this.postCustomer = this.postCustomer.bind(this)
        this.verifyCustomer = this.verifyCustomer.bind(this)
    }

    async postCustomer(req, res, next){
        try {
            this._validator.validateRegisterRequest(req.body)
            const { name, email, password, address, phone } = req.body
            const customerId = await this._service.addCustomer({ name, email, password, address, phone })
            await this._cartService.addCart(customerId)
            const jwt = generateJWT(customerId)
    
            return res.status(201).json({
                token: jwt
            })
        } catch(error){
            next(error)
        }
    }

    async verifyCustomer(req, res, next){
        try {
            this._validator.validateLoginRequest(req.body)
            const { email, password } = req.body 
            const customerId = await this._service.verifyCustomer(email, password)
            console.log(customerId)
            const jwt = generateJWT(customerId)
    
            return res.status(200).json({
                token: jwt
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = CustomerHandler