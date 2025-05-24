class CartHandler {
    constructor(service){
        this._service = service

        this.getCart = this.getCart.bind(this)
    }

    async getCart(_, res){
        const { customerId } = res.locals

        const cart = await this._service.getCart(customerId)

        return res.status(200).json(cart)
    }
}

module.exports = CartHandler