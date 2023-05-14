var express = require("express");
var router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  registerUser,
  login,
} = require("./../controllers/usersController.js");
const isEmailExist = require("../middlewares/isEmailExist.js");
const auth = require("../middlewares/auth.js");

/* GET users listing. */
//router.get('/', getAllUsers);
//router.get('/:id', getSingleUser);
router.post("/register", isEmailExist, registerUser);
router.get("/login", auth, login);

module.exports = router;
