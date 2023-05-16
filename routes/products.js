var express = require("express");
const {
  createProduct,
  getUserProducts,
  getAllProducts,
} = require("../controllers/productsController");
const auth = require("../middlewares/auth");
var router = express.Router();

router.get("/", getUserProducts, getAllProducts);
router.post("/create", auth, createProduct);

module.exports = router;
