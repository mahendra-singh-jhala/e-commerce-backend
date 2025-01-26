const Razorpay = require("razorpay");
const Order = require("../models/orderModel");
const crypto = require('crypto')

require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.ROZ_KEY_ID,
    key_secret: process.env.ROZ_KEY_SECRET
})

// Controller function for payment
exports.payment = async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount: amount * 100,
        currency,
    };
    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating order',
            error
        });
    }
};

// Controller function for payment verification
exports.paymentVerification = async (req, res) => {
    const { roz_orderId, paymentId, signature, orderId } = req.body;
    const generatedSignature = crypto.createHmac('sha256', razorpay.key_secret)
        .update(roz_orderId + '|' + paymentId)
        .digest('hex')
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (generatedSignature === signature) {
            if (order.orderStatus === "PENDING") {
                order.paymentDetails.paymentId = paymentId;
                order.paymentDetails.paymentStatus = "COMPLETED";
                order.orderStatus = "PLACED";

                await order.save();
                return res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                });
            }
        } else {
            res.status(400).json({ 
                success: false 
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error to verify payment",
            error: error.message
        });
    }
}