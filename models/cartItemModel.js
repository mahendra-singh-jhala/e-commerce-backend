const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },

    size: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 1
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    discountedPrice: {
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true})

const CartItem = mongoose.model("CartItems", cartItemSchema);

module.exports = CartItem