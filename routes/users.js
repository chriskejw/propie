var express = require('express')
var router = express.Router()

var passport = require('passport')
require('../config/passport')(passport)

var District = require('../models/district')
var Listing = require('../models/listing')
var User = require('../models/user')

// CHECK IF USER IS LOGGED IN=================================================

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You are already logged in!')
    return res.redirect('/profile')
  } else {
    return next(); // if they are not logged in, redirect them to home
  }
};

// HOME PAGE==================================================================

router.get('/', function(req, res) {
  Listing.find({}, function(err, allListings) {
    if (err) throw new Error(err)
    District.find({}, function(err, allDistricts) {
      if (err) throw new Error(err)
      console.log(allDistricts + allListings)
      res.render('users/index', {
        message1: req.flash('loginMessage'),
        message2: req.flash('signupMessage'),
        allListings: allListings.reverse(),
        allDistricts: allDistricts.reverse()
      })
    })
  })
})

//ABOUT=====================================================

router.get('/about', function(req, res) {
  Listing.find({}, function(err, allListings) {
    if (err) throw new Error(err)
    District.find({}, function(err, allDistricts) {
      if (err) throw new Error(err)
      User.find({}, function(err, allUsers) {
          if (err) throw new Error(err)
      res.render('users/about', {
        allUsers: allUsers,
        message1: req.flash('loginMessage'),
        message2: req.flash('signupMessage'),
        allListings: allListings.reverse(),
        allDistricts: allDistricts.reverse()
      })
      })
    })
  })
})

//UNDER CONSTRUCTION=====================================================

router.get('/underconstruction', function(req, res) {
  Listing.find({}, function(err, allListings) {
    if (err) throw new Error(err)
    District.find({}, function(err, allDistricts) {
      if (err) throw new Error(err)
      User.find({}, function(err, allUsers) {
          if (err) throw new Error(err)
      res.render('users/sorry', {
        allUsers: allUsers,
        message1: req.flash('loginMessage'),
        message2: req.flash('signupMessage'),
        allListings: allListings.reverse(),
        allDistricts: allDistricts.reverse()
      })
      })
    })
  })
})

// PROCESS THE LOGIN FORM=====================================================

router.post('/login', isLoggedIn, passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/', // redirect back to home page if there is an error
  failureFlash: true // show flash message
}))

// PROCESS THE SIGNUP FORM====================================================

router.route('/signup')
  .get(isLoggedIn, function(req, res) {
    Listing.find({}, function(err, allListings) {
      if (err) throw new Error(err)
      District.find({}, function(err, allDistricts) {
        if (err) throw new Error(err)
        User.find({}, function(err, allUsers) {
          res.render('users/index', {
            allUsers: allUsers,
            message1: req.flash('loginMessage'),
            message2: req.flash('signupMessage'),
            allListings: allListings,
            allDistricts: allDistricts
          })
        })
      })
    })
  })
  .post(isLoggedIn, passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  }));

//LOGOUT PAGE=================================================================

router.get('/logout', function(req, res) {
  req.logout() // logout session
  res.redirect('/') // go back to home
})

// PROFILE PAGE===============================================================

router.get('/profile', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/') // if not logged in, redirect to login page
  console.log(req.user._id)
  Listing.find({
    user_id: req.user._id
  }, function(err, allListings) {
    console.log(allListings)
    res.render('users/profile', {
      user: req.user.local.name,
      email: req.user.local.email,
      dateJoined: ((req.user.local.dateJoined).toLocaleDateString()),
      allListings: allListings.reverse(),
      message1: req.flash('loginMessage'),
      message2: req.flash('signupMessage')
    })
  })
});

//DELETE USER PROFILE========================================================

// router.get('/deleteProfile', function(req, res) {
//   if (!req.isAuthenticated()) {
//     res.redirect('/')
//   } else {
//     User.update({
//         'user.local.email': undefined
//       }, {
//         'user.local.password': undefined
//       },
//       function(err, doc) {
//         if (err) throw new Error(err)
//       }
//     )
//     console.log(req.user.local.email)
//     console.log(req.user.local.password)
//     res.send('done')
//     res.redirect('/')
//   }
// })

//===========================================================================

module.exports = router

// //CHECK IF LOGGED IN======================================================
//
// function isLoggedIn(req, res, next) {
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated()) {
//     req.flash('signupMessage', 'You are already logged in!')
//     console.log(signupMessage)
//     return res.redirect('/profile')
//   } else {
//     return next(); // if they aren't redirect them to the home page
//   }
// };
//
// // function isNotLoggedIn(req, res, next) {
// //   // if user is not authenticated in the session, carry on
// //   if (!req.isAuthenticated())
// //     return next();
// //       // if they aren't redirect them to the home page
// //       res.redirect('/home');
// // };
//
// //HOME====================================================================
//
// // // router.get('/', isLoggedIn, function (req, res) {
// // router.get('/', function (req, res) {
// //   Listing.find({}, function (err, allListings) {
// //       if (err) throw new Error (err)
// //     District.find({}, function (err, allDistricts) {
// //         if (err) throw new Error (err)
// //       console.log(allDistricts + allListings)
// //       res.render('users/index', {
// //         allListings: allListings,
// //         allDistricts: allDistricts
// //       })
// //     })
// //   })
// // })
//
// // router.get('/', isLoggedIn, function (req, res) {
// router.get('/', function (req, res) {
//     Listing.find({}, function (err, allListings) {
//       if (err) throw new Error (err)
//     District.find({}, function (err, allDistricts) {
//         if (err) throw new Error (err)
//       console.log(allDistricts + allListings)
//       res.render('users/index', {
//         message1: req.flash('loginMessage'),
//         message2: req.flash('signupMessage'),
//         allListings: allListings,
//         allDistricts: allDistricts
//       })
//     })
//   })
// })
//
// //LOGIN===================================================================
//
// // // show the login form
// // router.get ('/login', function(req, res) {
// //   res.render('users/index', { message: req.flash('loginMessage') });
// // });
// //
// // // process the login form
// // router.post('/login', passport.authenticate('local-login', {
// //   successRedirect : '/home/profile', // redirect to the secure profile section
// //   successFlash: true, // show flash message
// //   failureRedirect : '/home', // redirect back to home page if there is an error
// //   failureFlash : true // show flash message
// // }))
//
// // show the login form
// router.get('/login', function(req, res) {
//   res.render('users/index', {
//     message1: req.flash('loginMessage'),
//     message2: req.flash('signupMessage'),
//     allListings: allListings,
//     allDistricts: allDistricts
//   });
// });
//
// // process the login form
// router.post('/login', passport.authenticate('local-login', {
//   successRedirect : '/profile', // redirect to the secure profile section
//   failureRedirect : '/', // redirect back to home page if there is an error
//   failureFlash : true // show flash message
// }))
//
// //PROFILE=================================================================
//
// router.get('/profile', function(req, res) {
//   User.findById(req.user._id, function(err, user) {
//     Listing.find({}, function(err, allListings) {
//     District.find({}, function (err, allDistricts) {
//       res.render('users/profile', {
//         user:req.user,
//         message1: req.flash('loginMessage'),
//         message2: req.flash('signupMessage'),
//         allListings: allListings,
//         allDistricts: allDistricts}
//       )
//     })
//     })
//   })
// });
//
// //LOGOUT==================================================================
//
// router.get('/logout', function(req, res) {
//   req.logout() // logout session
//   res.redirect('/') // go back to home
// })
//
// //SIGNUP==================================================================
//
// // show the signup form
// router.route('/signup')
//   .get(isLoggedIn, function(req, res) {
//       res.render('users/index', {
//         message1: req.flash('loginMessage'),
//         message2: req.flash('signupMessage'),
//         allListings: allListings,
//         allDistricts: allDistricts
//       })
//   })
//   .post(passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/',
//     failureFlash: true,
//   }));
// //========================================================================
