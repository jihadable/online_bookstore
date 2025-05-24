const { hash, compareSync } = require("bcrypt")
const UnauthorizeError = require("../exception/UnauthorizeError")
const NotFoundError = require("../exception/NotFoundError")

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

        if (!customer){
            throw new NotFoundError("Pengguna tidak ditemukan")
        }
        
        if (!compareSync(password, customer.password)){
            throw new UnauthorizeError("Password tidak sesuai")
        }

        return customer.id
    }
}

module.exports = CustomerService