const Joi = require('joi');

const customerRequest = {
    registerRequest: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    loginRequest: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}
 
module.exports = customerRequest