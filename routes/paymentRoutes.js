const express = require("express")
const { userSignin } = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController")

const router = express.Router()

router.post("/:id", userSignin, paymentController.payment)

router.put("/payment", paymentController.updatePaymentInfo);

module.exports = router
