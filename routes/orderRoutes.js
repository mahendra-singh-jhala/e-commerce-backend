const express = require("express")
const { signin } = require("../middleware/authMiddleware")
const orderController = require("../controllers/orderController")

const router = express.Router();

router.post("/", signin, orderController.createOrder)

router.get("/user", signin, orderController.usersOrder)

router.get("/:id", signin, orderController.findOrderById)


// Admin
router.get("/", signin, orderController.getAllOrder)

router.put("/:orderId/confirmed", orderController.confirmOrder)

router.put("/:orderId/ship", orderController.shipOrder)

router.put("/:orderId/deliver", orderController.deliverOrder)

router.put("/:orderId/cancel", orderController.cancelOrder)

router.delete("/:orderId/delete", orderController.deleteOrder)

module.exports = router


