const express = require("express")
const cartController = require("../controllers/cartController");
const { signin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", signin, cartController.findUserCart)

router.put("/add", signin, cartController.addItemToCart)

router.put("/:id", signin, cartController.updateCartItem)

router.delete("/:id", signin, cartController.removeCartItem)


module.exports = router




