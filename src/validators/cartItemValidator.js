const BadRequestError = require("../exception/BadRequestError")

class CartItemValidator {
    constructor(requestModel){
        this._requestModel = requestModel
    }

    validatePostCartItemRequest(payload){
        const result = this._requestModel.postCartItemRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

module.exports = CartItemValidator