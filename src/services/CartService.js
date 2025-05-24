const NotFoundError = require("../exception/NotFoundError")

class CartService {
    constructor(db){
        this._db = db
    }

    async addCart(customerId){
        const cart = await this._db.cart.create({
            data: { customer_id: customerId }
        })

        return cart.id
    }

    async getCart(customerId){
        const cart = await this._db.cart.findUnique({
            where: { customer_id: customerId },
            select: {
                id: true,
                customer_id: true,
                created_at: true,
                items: {
                    select: {
                        id: true,
                        books_product_id: true,
                        quantity: true,
                        created_at: true,
                        product: {
                            select: {
                                format: true,
                                price: true,
                                book: {
                                    select: {
                                        title: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!cart){
            throw new NotFoundError("Keranjang belanja tidak ditemukan")
        }

        return {
            ...cart,
            items: cart.items.map(item => ({
                ...item,
                product: {
                    ...item.product,
                    price: parseFloat(item.product.price)
                }
            }))
        };
    }
}

module.exports = CartService