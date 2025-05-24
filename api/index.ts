require("dotenv").config()
const express = require("express")
const DB = require("../src/database/db")
const customerRouter = require("../src/routes/customerRoute")
const bookRouter = require("../src/routes/bookRoute")
const cartRouter = require("../src/routes/cartRoute")
const cartItemRouter = require("../src/routes/cartItemRoute")
const invoiceRouter = require("../src/routes/invoiceRoute")

const app = express()
app.use(express.json())
const PORT = process.env.PORT

const db = DB()
app.use(customerRouter(db))
app.use(bookRouter(db))
app.use(cartRouter(db))
app.use(cartItemRouter(db))
app.use(invoiceRouter(db))

app.listen(PORT, () => {
    console.log("Server is running on:", `http://localhost:${PORT}`)
})

module.exports = app