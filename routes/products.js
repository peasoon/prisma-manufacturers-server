var express = require("express");
const { createProduct } = require("../controllers/productsController");
const auth = require("../middlewares/auth");
var router = express.Router();

router.get("/", async (req, res) => {
  res.status(400).send("sasay");
});
router.post("/create", auth, createProduct);

module.exports = router;
