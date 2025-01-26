const express = require("express")
const { signin } = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController")

const router = express.Router()

// This route handles POST requests for payment
router.post("/payment", signin, paymentController.payment)

// This route handles POST requests for payment verifycation
router.post("/paymentVerify", paymentController.paymentVerification);

module.exports = router
