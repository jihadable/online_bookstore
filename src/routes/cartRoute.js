const { Router } = require("express")
const CartHandler = require("../handlers/CartHandler")
const CartService = require("../services/CartService")
const authMiddleware = require("../middlewares/authMiddleware")

function cartRouter(db){
    const service = new CartService(db)
    const handler = new CartHandler(service)
    const cartRoute = Router()

    cartRoute.get("/api/cart", authMiddleware, handler.getCart)

    return cartRoute
}

module.exports = cartRouter