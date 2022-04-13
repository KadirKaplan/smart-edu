const express = require('express');
const courseController = require('../controller/courseController');
const categoryController = require('../controller/categoryController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
router.route('/').post(roleMiddleware(["teacher", "admin"]), courseController.createCourse);
router.route('/').get(courseController.getAllCourse);
router.route('/:slug').get(courseController.getCourse);



module.exports = router;