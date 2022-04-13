const User = require('../models/User');
const Categories = require('../models/Category');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { redirect } = require('express/lib/response');
exports.createUser = async (req, res) => {

  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  }
  catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    });
  }



};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage =  async (req, res) => {
  const user = await User.findOne({_id:req.session.userID});
  const categories = await Categories.find();
  res.render('dashboard', {
      page_name: 'dashboard',
      user,
      categories
  });
};