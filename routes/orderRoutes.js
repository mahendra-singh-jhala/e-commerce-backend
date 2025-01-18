const express = require("express")
const { userSignin } = require("../middleware/authMiddleware")
const orderController = require("../controllers/orderController")

const router = express.Router();

router.post("/", userSignin, orderController.createOrder)

router.get("/user", userSignin, orderController.usersOrder)

router.get("/:id", userSignin, orderController.findOrderById)


// Admin
router.get("/", userSignin, orderController.getAllOrder)

router.put("/:orderId/confirmed", userSignin, orderController.confirmOrder)

router.put("/:orderId/ship", userSignin, orderController.shipOrder)

router.put("/:orderId/deliver", userSignin, orderController.deliverOrder)

router.put("/:orderId/cancel", userSignin, orderController.cancelOrder)

router.delete("/:orderId/delete", userSignin, orderController.deleteOrder)

module.exports = router


