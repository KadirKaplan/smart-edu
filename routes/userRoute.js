const express = require('express');
const authcontroller = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddlewares');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Enter Your Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),
        body('password').not().isEmpty().withMessage('Please Enter Your Password'),
    ],
    authcontroller.createUser);
router.route('/login').post(authcontroller.loginUser);
router.route('/logout').get(authcontroller.logoutUser);
router.route('/dashboard').get(authMiddleware, authcontroller.getDashboardPage);
module.exports = router;