class BookService {
    constructor(db){
        this._db = db
    }

    async getBooks(){
        const books = await this._db.book.findMany({
            select: {
                id: true,
                title: true,
                isbn: true,
                publication_year: true,
                genre: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return books
    }

    async getBookById(id){
        const book = await this._db.book.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                isbn: true,
                publication_year: true,
                genre: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                products: {
                    select: {
                        id: true,
                        format: true,
                        price: true,
                        stock: true,
                        warehouse: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return book
    }
}

module.exports = BookService