const { Router } = require("express")
const BookService = require("../services/BookService")
const BookHandler = require("../handlers/BookHandler")

function bookRouter(db){
    const service = new BookService(db)
    const handler = new BookHandler(service)
    const bookRoute = Router()

    bookRoute.get("/books", handler.getBooks)
    bookRoute.get("/books/:id", handler.getBookById)

    return bookRoute
}

module.exports = bookRouter