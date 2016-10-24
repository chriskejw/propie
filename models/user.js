var mongoose = require('mongoose')

var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  local: {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      lowercase: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    listing_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing'
    }],

    dateJoined: {
      type: Date,
      default: Date.now
    }

  }
})

userSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      next()
    })
  })
})

userSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
