class CartItemHandler {
    constructor(service, cartService){
        this._service = service
        this._cartService = cartService

        this.postCartItem = this.postCartItem.bind(this)
    }

    async postCartItem(req, res){
        const { customerId } = res.locals
        const { id: cartId } = await this._cartService.getCart(customerId)
        const { books_product_id: booksProductId, quantity } = req.body

        const cartItem = await this._service.addCartItem({ cartId, booksProductId, quantity })

        return res.status(200).json(cartItem)
    }
}

module.exports = CartItemHandler