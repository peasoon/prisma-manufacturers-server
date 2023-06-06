var express = require("express");
const {
  createProduct,
  getUserProducts,
  getAllProducts,
  getSingleProduct
} = require("../controllers/productsController");
const auth = require("../middlewares/auth");
var router = express.Router();

router.get("/", getUserProducts, getAllProducts);
router.get("/:id",getSingleProduct)
router.post("/create", auth, createProduct);

module.exports = router;
