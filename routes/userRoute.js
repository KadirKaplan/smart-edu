const express = require('express');
const authcontroller = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddlewares');


const router = express.Router();
router.route('/signup').post(authcontroller.createUser);
router.route('/login').post(authcontroller.loginUser);
router.route('/logout').get(authcontroller.logoutUser);
router.route('/dashboard').get(authMiddleware, authcontroller.getDashboardPage);
module.exports = router;