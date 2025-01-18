const express = require("express")
const cartController = require("../controllers/cartController");
const { userSignin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", userSignin, cartController.findUserCart)

router.put("/add", userSignin, cartController.addItemToCart)

router.put("/:id", userSignin, cartController.updateCartItem)

router.delete("/:id", userSignin, cartController.removeCartItem)


module.exports = router




