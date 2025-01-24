const express = require("express")
const { signin } = require("../middleware/authMiddleware")
const orderController = require("../controllers/orderController")

const router = express.Router();

router.post("/", signin, orderController.createOrder)

router.get("/user", signin, orderController.usersOrder)

router.get("/:id", signin, orderController.findOrderById)


// Admin
router.get("/", signin, orderController.getAllOrder)

router.put("/:orderId/confirmed", signin, orderController.confirmOrder)

router.put("/:orderId/ship", signin, orderController.shipOrder)

router.put("/:orderId/deliver", signin, orderController.deliverOrder)

router.put("/:orderId/cancel", signin, orderController.cancelOrder)

router.delete("/:orderId/delete", signin, orderController.deleteOrder)

module.exports = router


