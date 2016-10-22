var express = require('express')
var router = express.Router()
var Listing = require('../models/listing')

router.get('/', function (req, res) {
  Listing.find({}, function (err, allListings) {
    console.log(allListings)
    res.render('users/index-passport', {
      allListings: allListings
    })
  })
})

module.exports = router
