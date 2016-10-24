// load all the things we need
var LocalStrategy = require('passport-local').Strategy
// load up the user model
var User = require('../models/user')

// used to serialize the user for the session
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
// used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  }, function (req, email, password, next) {
    // the authentication flow on our local auth routes

    process.nextTick(function () {
      User.findOne({'local.email': email }, function (err, foundUser) {
        // if user is found, dont create new user
        // if user is not found, create new user

        if (err) return next(err)

        if (foundUser) {
          return next(null, false, req.flash('signupMessage', 'Email has been taken!'))
        } else {
          User.create(req.body.user, function (err, newUser) {
            if (err) throw err
            return next(null, newUser)
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    User.findOne({ 'local.email': email }, function (err, foundUser) {
      // if there are any errors, return the error
      if (err) return next(err)
      // if cannot find use by email, return to route with flash message
      if (!foundUser)
        return next(null, false, req.flash('loginMessage', 'No user found with this email!'))

      foundUser.auth(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundUser)
        } else {
          return next(null, false, req.flash('loginMessage', 'Password does not match!'))
        }
      })
    })
  }))
}
