const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },

    size: {
        type: String,
        required: true
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
    
}, { timestamps: true })

const OrderItems = mongoose.model("OrderItems", orderItemSchema);

module.exports = OrderItems