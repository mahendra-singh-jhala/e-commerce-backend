const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    zipCode: {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    phoneNumber: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Addresses = mongoose.model("Addresses", AddressSchema)

module.exports = Addresses