const express = require("express")
const { signin } = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController")

const router = express.Router()

router.post("/payment", signin, paymentController.payment)

router.post("/paymentVerify", paymentController.paymentVerification);

module.exports = router
