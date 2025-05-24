const { Router } = require("express")
const CustomerService = require("../services/CustomerService")
const CustomerHandler = require("../handlers/CustomerHandler")
const CartService = require("../services/CartService")
const CustomerValidator = require("../validators/customerValidator")
const customerRequest = require("../model/request/customerRequest")

function customerRouter(db){
    const service = new CustomerService(db)
    const cartService = new CartService(db)
    const validator = new CustomerValidator(customerRequest)
    const handler = new CustomerHandler(service, cartService, validator)
    const customerRoute = Router()

    customerRoute.post("/auth/register", handler.postCustomer)
    customerRoute.post("/auth/login", handler.verifyCustomer)

    return customerRoute
}

module.exports = customerRouter