require("dotenv").config()
const express = require("express")
const DB = require("./database/db")
const customerRouter = require("./routes/customerRoute")
const bookRouter = require("./routes/bookRoute")
const cartRouter = require("./routes/cartRoute")
const cartItemRouter = require("./routes/cartItemRoute")
const invoiceRouter = require("./routes/invoiceRoute")

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