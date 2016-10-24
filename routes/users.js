var express = require('express')
var router = express.Router()
var passport = require('passport')
require('../config/passport')(passport)

var Listing = require('../models/listing')
var User = require('../models/user')

//==============================================================================

// function authCheck(req, res, next) {
//   // if req.isAuthenticated is false, then let it be
//   // if it's true, redirect back to profile
//   if (req.isAuthenticated()) {
//     req.flash('signupMessage', 'You have logged in, what are you doing bruh?')
//     return res.redirect('/home/profile')
//   } else {
//     return next()
//   }
// }

//==============================================================================

function isLoggedIn(req, res, next) {
    // res.send(req.isAuthenticated())
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/home');
}
function isNotLoggedIn(req, res, next) {
  if (! req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/home');
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

//=============================================================================

router.route('/signup')
  .get(isNotLoggedIn, function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/index', {
        allUsers: allUsers,
        message: req.flash('signupMessage')
      })
    })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/home/profile',
    failureRedirect: '/home/profile',
    failureFlash: true
  }))

//=============================================================================

// login routes
router.get ('/login', isNotLoggedIn, function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('users/login', { message: req.flash('loginMessage') });
});
// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home/profile', // redirect to the secure profile section
  failureRedirect : '/home', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
    }))

//=============================================================================

// router.route('/login')
//   .get(function(req, res) {
//     User.find({}, function(err, allUsers) {
//       res.render('users/login', {
//         allUsers: allUsers,
//         message: req.flash('loginMessage')
//       })
//     })
//   })
//   .post(passport.authenticate('local-login', {
//     successRedirect: '/home/profile',
//     failureRedirect: '/home/login',
//     failureFlash: true
//   }))

//=============================================================================

router.get('/error', function(req, res) {
  res.render('users/error')
})

//=============================================================================

router.get('/profile', isLoggedIn, function(req, res) {
  User.findById(req.user._id, function(err, user) {
    Listing.find({}, function(err, allListings){
      res.render('users/profile'), {user:req.user, allListings:allListings}
    })
  })
});

//=============================================================================

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/home')
})

//=============================================================================

module.exports = router
