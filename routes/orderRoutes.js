const express = require("express")
const { signin } = require("../middleware/authMiddleware")
const orderController = require("../controllers/orderController")

const router = express.Router();

// This route handles POST requests for create order
router.post("/", signin, orderController.createOrder)

// This route handles GET requests for get user order
router.get("/user", signin, orderController.usersOrder)

// This route handles GET requests for get order by Id
router.get("/:id", signin, orderController.findOrderById)

// Admin
// This route handles GET requests for get all order
router.get("/", signin, orderController.getAllOrder)

// This route handles PUT requests for update orderStatus
router.put("/:orderId/confirmed", orderController.confirmOrder)

// This route handles PUT requests for update orderStatus
router.put("/:orderId/ship", orderController.shipOrder)

// This route handles PUT requests for update orderStatus
router.put("/:orderId/deliver", orderController.deliverOrder)

// This route handles PUT requests for update orderStatus
router.put("/:orderId/cancel", orderController.cancelOrder)

// This route handles DELETE requests for order
router.delete("/:orderId/delete", orderController.deleteOrder)

module.exports = router


