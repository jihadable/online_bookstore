class InvoiceHandler {
    constructor(service, cartService, cartItemService){
        this._service = service
        this._cartService = cartService
        this._cartItemService = cartItemService

        this.postInvoice = this.postInvoice.bind(this)
        this.getInvoices = this.getInvoices.bind(this)
    }

    async postInvoice(_, res){
        const { customerId } = res.locals
        const { id: cartId } = await this._cartService.getCart(customerId)
        const totalAmount = await this._cartItemService.getTotalAmount(cartId)

        const invoice = await this._service.addInvoice({ customerId, cartId, totalAmount })

        return res.status(200).json(invoice)
    }

    async getInvoices(_, res){
        const { customerId } = res.locals

        const invoices = await this._service.getInvoices(customerId)

        return res.status(200).json(invoices)
    }
}

module.exports = InvoiceHandler