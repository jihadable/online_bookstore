const { hash, compareSync } = require("bcrypt")

class CustomerService {
    constructor(db){
        this._db = db
    }

    async addCustomer({ name, email, password, address, phone }){
        const hashedPassword = await hash(password, 10)
        const newCustomer = await this._db.customer.create({
            data: {
                name, 
                email, 
                password: hashedPassword,
                address,
                phone
            }
        })

        return newCustomer.id
    }

    async verifyCustomer(email, password){
        const customer = await this._db.customer.findUnique({
            where: { email }
        })
        
        if (!compareSync(password, customer.password)){

        }

        return customer.id
    }
}

module.exports = CustomerService