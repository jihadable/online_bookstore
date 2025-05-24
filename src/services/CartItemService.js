class CartItemService {
    constructor(db){
        this._db = db
    }

    async addCartItem({ cartId, booksProductId, quantity }){
        const cartItem = await this._db.cartItem.create({
            data: {
                books_product_id: booksProductId,
                quantity,
                cart_id: cartId
            }
        })

        return cartItem
    }

    async getTotalAmount(cartId){
        const cartItems = await this._db.cartItem.findMany({
            where: { cart_id: cartId },
            select: {
                quantity: true,
                product: {
                    select: {
                        price: true   
                    }
                }
            }
        })

        const totalAmount = cartItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price)
        }, 0)

        return totalAmount        
    }
}

module.exports = CartItemService