var express = require('express');
var router = express.Router();

const {getAllUsers,getSingleUser,registerUser} = require('./../controllers/usersController.js');
const isEmailExist = require('../middlewares/isEmailExist.js');

/* GET users listing. */
//router.get('/', getAllUsers);
//router.get('/:id', getSingleUser);
router.post('/register',isEmailExist ,registerUser);

module.exports = router;
