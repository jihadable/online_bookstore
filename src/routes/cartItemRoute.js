const { Router } = require("express")
const CartItemHandler = require("../handlers/CartItemHandler")
const CartItemService = require("../services/CartItemService")
const authMiddleware = require("../middlewares/authMiddleware")
const CartService = require("../services/CartService")

function cartItemRouter(db){
    const service = new CartItemService(db)
    const cartService = new CartService(db)
    const handler = new CartItemHandler(service, cartService)
    const cartItemRoute = Router()

    cartItemRoute.post("/api/cart/items", authMiddleware, handler.postCartItem)

    return cartItemRoute
}

module.exports = cartItemRouter