const express = require('express');
const authcontroller = require('../controller/authController');

const router = express.Router();
router.route('/signup').post(authcontroller.createUser);
router.route('/login').post(authcontroller.loginUser);

module.exports = router;