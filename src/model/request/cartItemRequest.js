const Joi = require("joi");

const cartItemRequest = {
    postCartItemRequest: Joi.object({
        books_product_id: Joi.string().required(),
        quantity: Joi.number().required()
    })
}

module.exports = cartItemRequest