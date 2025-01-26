const express = require("express")
const productController = require("../controllers/productController");
const { signin } = require("../middleware/authMiddleware");

const router = express.Router()

// This route handles GET requests for get all products
router.get("/", productController.getAllProduct)

// This route handles GET requests for get product by Id
router.get("/id/:id", signin, productController.findProductById)

// Admin
// This route handles POST requests for create product
router.post("/", signin, productController.createProduct)

// This route handles PUT requests for update product
router.put("/:id", signin, productController.updateProduct)

// This route handles DELETE requests for delete product
router.delete("/:id", signin, productController.deleteProduct)

module.exports = router