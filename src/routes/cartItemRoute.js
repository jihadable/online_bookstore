const { Router } = require("express")
const CartItemHandler = require("../handlers/CartItemHandler")
const CartItemService = require("../services/CartItemService")
const authMiddleware = require("../middlewares/authMiddleware")
const CartService = require("../services/CartService")
const CartItemValidator = require("../validators/cartItemValidator")
const cartItemRequest = require("../model/request/cartItemRequest")

function cartItemRouter(db){
    const service = new CartItemService(db)
    const cartService = new CartService(db)
    const validator = new CartItemValidator(cartItemRequest)
    const handler = new CartItemHandler(service, cartService, validator)
    const cartItemRoute = Router()

    cartItemRoute.post("/cart/items", authMiddleware, handler.postCartItem)

    return cartItemRoute
}

module.exports = cartItemRouter