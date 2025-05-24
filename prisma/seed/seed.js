const { hash } = require('bcrypt')
const DB = require('../../src/database/db')
const db = DB()

async function main() {
    await db.cartItem.deleteMany()
    await db.cart.deleteMany()
    await db.booksProduct.deleteMany()
    await db.book.deleteMany()
    await db.author.deleteMany()
    await db.warehouse.deleteMany()
    await db.customer.deleteMany()
    
    // Seed authors
    const author1 = await db.author.create({
        data: { 
            name: 'J.K. Rowling',
            bio: "bio 1",
            birthdate: new Date()
        }
    })

    const author2 = await db.author.create({
        data: { 
            name: 'George R.R. Martin',
            bio: "bio 2",
            birthdate: new Date()
        }
    })

    // Seed warehouse
    const warehouse1 = await db.warehouse.create({
        data: {
            name: "warehouse 1",
            location: "warehouse 1 location",
            capacity: 100,
        }
    })

    const warehouse2 = await db.warehouse.create({
        data: {
            name: "warehouse 2",
            location: "warehouse 2 location",
            capacity: 150,
        }
    })

    // Seed books
    const book1 = await db.book.create({
        data: {
            title: 'Harry Potter and the Philosopher\'s Stone',
            author_id: author1.id,
            isbn: "3248",
            publication_year: 2004,
            genre: "fiction"
        }
    })

    const book2 = await db.book.create({
        data: {
            title: 'A Game of Thrones',
            author_id: author2.id,
            isbn: "1809",
            publication_year: 2012,
            genre: "fiction"
        }
    })

    // Seed books_product
    await db.booksProduct.createMany({
        data: [
            {
                book_id: book1.id,
                price: 150000,
                stock: 10,
                format: "hardcover",
                warehouse_id: warehouse1.id
            },
            {
                book_id: book1.id,
                price: 155000,
                stock: 20,
                format: "hardcover",
                warehouse_id: warehouse2.id
            },
            {
                book_id: book2.id,
                price: 200000,
                stock: 5,
                format: "hardcover",
                warehouse_id: warehouse1.id
            },
            {
                book_id: book2.id,
                price: 220000,
                stock: 34,
                format: "hardcover",
                warehouse_id: warehouse2.id
            }
        ]
    })

    // Seed customer
    const hashedPassword = await hash("abcddcba", 10)
    const customer1 = await db.customer.create({
        data: {
            name: "umar",
            email: "umar@mail.com",
            password: hashedPassword,
            address: "Jl. Langsat",
            phone: "082352385586"
        }
    })

    // Seed cart
    const cart1 = await db.cart.create({
        data: {
            customer_id: customer1.id
        }
    })

    console.log("✅ Seeding completed.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())