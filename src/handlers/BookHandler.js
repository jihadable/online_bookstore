class BookHandler {
    constructor(service){
        this._service = service

        this.getBooks = this.getBooks.bind(this)
        this.getBookById = this.getBookById.bind(this)
    }

    async getBooks(_, res){
        const books = await this._service.getBooks()

        return res.status(200).json(books)
    }

    async getBookById(req, res){
        const { id } = req.params
        const book = await this._service.getBookById(id)

        return res.status(200).json(book)
    }
}

module.exports = BookHandler