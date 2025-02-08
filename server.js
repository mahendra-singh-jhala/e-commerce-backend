const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const connectdb = require("./config/db")
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const cartRouter = require("./routes/cartRoutes")
const orderRouter = require("./routes/orderRoutes")
const productRouter = require("./routes/productRoutes")
const paymentRouter = require("./routes/paymentRoutes")

// load enviorment variable
require('dotenv').config();

const app = express()

// Connect mongodb
connectdb();

// middleware
app.use(bodyParser.json())
app.use(cors({
    origin: 'https://shopper-new-e-commerce.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

// routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter)
app.use("/api/products", productRouter)
app.use("/api/payments", paymentRouter)

PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})