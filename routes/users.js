var express = require('express')
var router = express.Router()
var passport = require('passport')
require('../config/passport')(passport)

var User = require('../models/user')

//==============================================================================

function authCheck(req, res, next) {
  // if req.isAuthenticated is false, then let it be
  // if it's true, redirect back to profile
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in, what are you doing bruh?')
    return res.redirect('/home/profile')
  } else {
    return next()
  }
}

//==============================================================================

router.get('/', function(req, res) {
  User.find({}, function(err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})

router.route('/signup')
  .get(authCheck, function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/index', {
        allUsers: allUsers,
        message: req.flash('signupMessage')
      })
    })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/home/profile',
    failureRedirect: '/home',
    failureFlash: true
  }))

router.route('/login')
  .get(function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/login', {
        allUsers: allUsers,
        message: req.flash('loginMessage')
      })
    })
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/home/profile',
    failureRedirect: '/home/login',
    failureFlash: true
  }))

router.get('/error', function(req, res) {
  res.render('users/error')
})

router.get('/profile', function(req, res) {
  // res.send(req.user)
  res.render('users/profile', {
    message: req.flash('loginMessage')
  })
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/home')
})

module.exports = router
