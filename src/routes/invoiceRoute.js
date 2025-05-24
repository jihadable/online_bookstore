const { Router } = require("express")
const InvoiceHandler = require("../handlers/InvoiceHandler")
const InvoiceService = require("../services/InvoiceService")
const authMiddleware = require("../middlewares/authMiddleware")
const CartService = require("../services/CartService")
const CartItemService = require("../services/CartItemService")

function invoiceRouter(db){
    const service = new InvoiceService(db)
    const cartService = new CartService(db)
    const cartItemService = new CartItemService(db)
    const handler = new InvoiceHandler(service, cartService, cartItemService)
    const invoiceRoute = Router()

    invoiceRoute.post("/api/checkout", authMiddleware, handler.postInvoice)
    invoiceRoute.get("/api/invoices", authMiddleware, handler.getInvoices)

    return invoiceRoute
}

module.exports = invoiceRouter