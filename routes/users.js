var express = require('express');
var router = express.Router();

const {getAllUsers,getSingleUser,registerUser} = require('./../controllers/usersController.js')

/* GET users listing. */
//router.get('/', getAllUsers);
//router.get('/:id', getSingleUser);
router.post('/register', registerUser);

module.exports = router;
