class InvoiceService {
    constructor(db){
        this._id = db
    }

    async addInvoice({ customerId, cartId, totalAmount }){
        const invoice = await this._id.invoice.create({
            data: {
                total_amount: totalAmount,
                customer_id: customerId,
                cart_id: cartId,
                status: "pending"
            }
        })

        return {
            invoice_id: invoice.id,
            status: invoice.status,
            total_amount: invoice.total_amount,
            issued_at: invoice.issued_at
        }
    }

    async getInvoices(customerId){
        const invoices = await this._id.invoice.findMany({
            where: { customer_id: customerId },
            select: {
                id: true,
                cart_id: true,
                total_amout: true,
                status: true,
                issued_at: true
            }
        })

        return invoices
    }
}

module.exports = InvoiceService