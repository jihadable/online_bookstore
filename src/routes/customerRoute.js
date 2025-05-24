const { Router } = require("express")
const CustomerService = require("../services/CustomerService")
const CustomerHandler = require("../handlers/CustomerHandler")
const CartService = require("../services/CartService")

function customerRouter(db){
    const service = new CustomerService(db)
    const cartService = new CartService(db)
    const handler = new CustomerHandler(service, cartService)
    const customerRoute = Router()

    customerRoute.post("/auth/register", handler.postCustomer)
    customerRoute.post("/auth/login", handler.verifyCustomer)

    return customerRoute
}

module.exports = customerRouter