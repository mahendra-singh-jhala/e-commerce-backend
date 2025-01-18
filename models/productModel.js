const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    discountedPrice: {
        type: Number,
        required: true
    },

    discountPersent: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    brand: {
        type: String
    },

    color: {
        type: String
    },

    sizes: [{
        name: {
            type: String
        },

        quantity: {
            type: Number
        }
    }],

    imageUrl: {
        type: String
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    }
}, { timestamps: true })

const Product = mongoose.model("Products", productSchema);

module.exports = Product