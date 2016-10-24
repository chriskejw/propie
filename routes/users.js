var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);

var District = require('../models/district');
var Listing = require('../models/listing');
var User = require('../models/user');

//CHECK IF LOGGED IN===========================================================

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    // if they aren't redirect them to the home page
    return next();
    } else {
    res.redirect('/error');
  }
};

// function isLoggedIn(req, res, next) {
//   // if user is not authenticated in the session, carry on
//   if (req.isAuthenticated())
//     return next();
//       // if they aren't redirect them to the home page
//       res.redirect('/home');
// };

// function isNotLoggedIn(req, res, next) {
//   // if user is not authenticated in the session, carry on
//   if (!req.isAuthenticated())
//     return next();
//       // if they aren't redirect them to the home page
//       res.redirect('/home');
// };

//HOME=========================================================================

// router.get('/', isLoggedIn, function (req, res) {
router.get('/', function (req, res) {
  Listing.find({}, function (err, allListings) {
      if (err) throw new Error (err)
    District.find({}, function (err, allDistricts) {
        if (err) throw new Error (err)
      console.log(allDistricts + allListings)
      res.render('users/index', {
        allListings: allListings,
        allDistricts: allDistricts
      })
    })
  })
})

//SIGNUP=======================================================================

router.route('/signup')
  .get(isLoggedIn, function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/index', {
        allUsers: allUsers,
        message: req.flash('signupMessage') // show flash messages
      })
    })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/home/profile',
    failureRedirect: '/home',
    failureFlash: true // show flash messages
  }));

//LOGIN========================================================================

router.get ('/login', isLoggedIn, function(req, res) {
  // render the page and pass in any flash data if it exist
  res.render('users/login', { message: req.flash('loginMessage') });
});
// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home/profile', // redirect to the secure profile section
  failureRedirect : '/home', // redirect back to home page if there is an error
  failureFlash : true // show flash messages
    }))

//PROFILE======================================================================

router.get('/profile', function(req, res) {
  User.findById(req.user._id, function(err, user) {
    Listing.find({}, function(err, allListings){
    District.find({}, function (err, allDistricts) {
      res.render('users/profile', {user:req.user, allListings: allListings, allDistricts: allDistricts}
      )
    })
  })
  })
});

//LOGOUT=======================================================================

router.get('/logout', function(req, res) {
  req.logout() // logout session
  res.redirect('/home') // go back to home
})

//=============================================================================

module.exports = router
