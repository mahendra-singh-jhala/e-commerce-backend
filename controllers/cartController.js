const Cart = require("../models/cartModel")
const Product = require("../models/productModel")
const CartItem = require("../models/cartItemModel")

exports.findUserCart = async (req, res) => {
    const userId = req.user._id

    try {
        const cart = await Cart.findOne({ user: userId })

        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        cart.cartItem = cartItems;

        let totalPrice = 0
        let totalDiscountedPrice = 0
        let totalItem = 0

        for (let cartItem of cart.cartItem) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice
            totalItem += cartItem.quantity
        }

        cart.totalPrice = totalPrice
        cart.totalItem = totalItem
        cart.totalDiscountPrice = totalDiscountedPrice
        cart.discount = totalPrice - totalDiscountedPrice


        res.status(200).json({
            message: "User Cart find successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}


exports.addItemToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, size } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found, please create a cart first."
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const isPresent = await CartItem.findOne({
            cart: cart._id,
            product: productId,
            size,
        });

        if (isPresent) {
            isPresent.quantity += 1;
            await isPresent.save();

            return res.status(200).json({
                message: "Item quantity updated successfully",
                cartItem: isPresent
            });
        } else {

            const cartItem = new CartItem({
                product: productId,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size,
                discountedPrice: product.discountedPrice
            });

            const createCartItem = await cartItem.save();

            cart.cartItem.push(createCartItem);
            await cart.save();

            res.status(200).json({
                message: "CartItem added successfully",
                cartItem: createCartItem
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal server error. Please try again later",
            error: error.message
        });
    }
};


exports.updateCartItem = async (req, res) => {
    const { quantity } = req.body;

    try {
        const cartItem = await CartItem.findByIdAndUpdate(
            req.params.id,
            { quantity: quantity },
            { new: true }
        ).populate("product")

        if (!cartItem) {
            return res.status(404).json({
                message: "CartItem not found"
            });
        }

        let price = cartItem?.product?.price
        let discountedPrice = cartItem?.product?.discountedPrice

        price = cartItem.quantity * price;
        discountedPrice = cartItem.quantity * discountedPrice;

        cartItem.price = price;
        cartItem.discountedPrice = discountedPrice;

        await cartItem.save();

        res.status(200).json({
            message: "Cart item updated successfully",
            updatedCartItem: cartItem
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        });
    }
};



exports.removeCartItem = async (req, res) => {
    const cartItemId = req.params.id

    try {
        await CartItem.findByIdAndDelete(cartItemId);

        res.status(200).json({
            message: "CartItem removed successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error. Please try again later',
            error: error.message
        })
    }
}

