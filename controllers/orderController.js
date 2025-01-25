const Address = require("../models/addressModel")
const Cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const OrderItems = require("../models/orderItemModel")
const CartItem = require("../models/cartItemModel")

exports.createOrder = async (req, res) => {
    const userId = req.user._id
    const user = req.user
    const { firstname, lastname, city, state, streetAddress, zipCode, phoneNumber } = req.body.address

    try {
        
        const existAddress = await Address.findById(streetAddress._id)
        if (existAddress) {
            return res.status(409).json({
                message: "Address already exists"
            });
        }

        let address = new Address({
            firstname,
            lastname,
            city,
            state,
            address: streetAddress,
            zipCode,
            phoneNumber
        })

        address.user = user;
        await address.save()

        user.addresses.push(address);
        await user.save();

        const cart = await Cart.findOne({ user: userId })

        let cartItem = await CartItem.find({ cart: cart._id }).populate("product");

        const orderItems = [];
        let totalPrice = 0;
        let totalDiscountPrice = 0;
        let totalDiscount = 0;
        let totalItem = 0;

        for (const item of cartItem) {
            totalItem += item.quantity;

            const orderItem = new OrderItems({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice
            });

            const createOrderItem = await orderItem.save();
            orderItems.push(createOrderItem);

            totalPrice += item.price * item.quantity;
            totalDiscountPrice += item.discountedPrice * item.quantity;
            totalDiscount += (item.price - item.discountedPrice) * item.quantity;
        }


        const createOrder = new Order({
            user,
            orderItems,
            totalPrice: totalPrice,
            totalDiscountPrice: totalDiscountPrice,
            discount: totalDiscount,
            totalItem: totalItem, 
            shippingAddress: address
        });
        

        const saveOrder = await createOrder.save();
        res.status(200).json({
            message: "Oreder create successfully",
            saveOrder
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

exports.findOrderById = async (req, res) => {
    const orderId = req.params.id

    try {
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate("shippingAddress")

        if (!order) {
            res.status(400).json({
                message: "order not found"
            })
        }

        res.status(200).json({
            order
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

exports.usersOrder = async (req, res) => {
    const userId = req.user._id
    try {
        const orders = await Order.find({ user: userId })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        res.status(200).json({
            orders
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}


// Admin
exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        res.status(200).json({
            orders
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

exports.placeOrder = async (req, res) => {
    const orderId  = req.params.id

    try {
        const order = await Order.findById(orderId);

        order.orderStatus = "Placed",
        order.paymentDetails.status = "COMPLETED"

        const orderStatus = await order.save();
        res.status(200).json({
            orderStatus
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}

exports.confirmOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId);

        order.orderStatus = "CONFIRMED"

        const orderStatus = await order.save();
        res.status(200).json({
            orderStatus
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

exports.shipOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId);

        order.orderStatus = "SHIPPED"

        const orderStatus = await order.save();
        res.status(200).json({
            orderStatus
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}


exports.deliverOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId);

        order.orderStatus = "DELIVERED"

        const orderStatus = await order.save();
        res.status(200).json({
            orderStatus
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}

exports.cancelOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId);

        order.orderStatus = "CANCELLED"

        const orderStatus = await order.save();
        res.status(200).json({
            orderStatus
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        await Order.findByIdAndDelete(orderId)

        res.status(200).json({
            message: "Order Delete Succsefully"
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later'
        })
    }
}


