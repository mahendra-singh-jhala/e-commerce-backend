const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    cartItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItems",
        required: true
    }],

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalItem: {
        type: Number,
        required: true,
        default: 0
    },

    totalDiscountPrice: {
        type: Number,
        required: true,
        default: 0
    },

    discount: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart