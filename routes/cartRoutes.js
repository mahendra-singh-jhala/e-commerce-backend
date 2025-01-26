const express = require("express")
const cartController = require("../controllers/cartController");
const { signin } = require("../middleware/authMiddleware");

const router = express.Router();

// This route handles GET requests for find user cart
router.get("/", signin, cartController.findUserCart)

// This route handles PUT requests for cart item
router.put("/add", signin, cartController.addItemToCart)

// This route handles PUT requests for update cartItem
router.put("/:id", signin, cartController.updateCartItem)

// This route handles DELETE requests for remove cart item
router.delete("/:id", signin, cartController.removeCartItem)

module.exports = router




