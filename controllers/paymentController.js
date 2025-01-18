const Razorpay = require("razorpay");
const Order = require("../models/orderModel");

require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.ROZ_KEY_ID, 
    key_secret: process.env.ROZ_KEY_SECRET
});

exports.payment = async (req, res) => {
    const orderId = req.params.id;
    
    try {
        const order = await Order.findById(orderId)
            .populate('user')
            .populate('shippingAddress');

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const payment = {
            amount: order.totalDiscountPrice * 100,
            currency: "INR",
            description: `Payment for Order ID: ${orderId}`,
            customer: {
                name: `${order.user.firstname} ${order.user.lastname}`,
                email: order.user.email,
                contact: String(order.shippingAddress.phoneNumber)
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method: "get"
        };
       
        const paymentLink = await razorpay.paymentLink.create(payment);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        res.status(200).json({
            message: "Payment successful",
            paymentLinkId,
            payment_link_url
        });

    } catch (error) {
        res.status(500).json({
            message: "Error: To Payment",
            error: error.message
        });
    }
};

exports.updatePaymentInfo = async (req, res) => {
    const { orderId, paymentId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const payment = await razorpay.payments.fetch(paymentId);

        if (order.orderStatus === "PENDING") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.paymentStatus = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
            return res.status(200).json({ 
                success: true, 
                message: "Payment successful",
                order
            });
        } 
    } catch (error) {
        return res.status(500).json({ 
            message: "Error processing payment callback", 
            error: error.message 
        });
    }
};