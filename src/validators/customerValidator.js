const BadRequestError = require("../exception/BadRequestError")

class CustomerValidator {
    constructor(requestModel){
        this._requestModel = requestModel
    }

    validateRegisterRequest(payload){
        const result = this._requestModel.registerRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }

    validateLoginRequest(payload){
        const result = this._requestModel.loginRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

module.exports = CustomerValidator