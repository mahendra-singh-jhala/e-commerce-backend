const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItems",
        required: true
    }],

    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },

    deliveryDate: {
        type: Date
    },

    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses"
    },

    paymentDetails: {
        paymentId: {
            type: String
        },

        paymentStatus: {
            type: String
        }
    },

    totalPrice: {
        type: Number,
        required: true
    },

    totalDiscountPrice: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        default: "PENDING",
        required: true
    },

    totalItem: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order