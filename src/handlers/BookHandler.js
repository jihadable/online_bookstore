class BookHandler {
    constructor(service){
        this._service = service

        this.getBooks = this.getBooks.bind(this)
        this.getBookById = this.getBookById.bind(this)
    }

    async getBooks(_, res, next){
        try {
            const books = await this._service.getBooks()
    
            return res.status(200).json(books)
        } catch(error){
            next(error)
        }
    }

    async getBookById(req, res, next){
        try {
            const { id } = req.params
            const book = await this._service.getBookById(id)
    
            return res.status(200).json(book)
        } catch(error){
            next(error)
        }
    }
}

module.exports = BookHandler