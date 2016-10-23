var express = require('express')
var router = express.Router()
var Listing = require('../models/listing')

// router.get('/', function (req, res) {
//   Listing.find({}, function (err, allListings) {
//     console.log(allListings)
//     res.render('users/index-passport', {
//       allListings: allListings
//     })
//   })
// })

router.get('/', function (req, res) {
    res.render("listings/all")
})

router.get('/details', function (req, res) {
    res.render("listings/details")
})

router.get('/new', function (req, res) {
    res.render("listings/new")
})

module.exports = router
