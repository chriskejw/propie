var express = require('express')
var router = express.Router()
var Listing = require('../models/listing')
var District = require('../models/district')

// router.get('/', function (req, res) {
//   Listing.find({}, function (err, allListings) {
//     console.log(allListings)
//     res.render('users/index-passport', {
//       allListings: allListings
//     })
//   })
// })

router.get('/all', function (req, res) {
  Listing.find({}, function (err, allListings) {
      if (err) throw new Error (err)
    District.find({}, function (err, allDistricts) {
        if (err) throw new Error (err)
      console.log(allDistricts + allListings)
      res.render('listings/all', {
        allListings: allListings,
        allDistricts: allDistricts
      })
    })
  })
    // console.log(allListings)
    // res.render('listings/all', {
    //
    // })
  })



router.get('/details', function (req, res) {
    console.log(req.user)
    res.render("listings/details")
})

router.route('/new')
.post(function(req, res) {
  console.log('req:', req.body)
  Listing.create(req.body.listing, function (err, listing) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      res.redirect('/home/profile')
    }
  })
})
.get(function (req, res) {
  District.find({}, function (err, allDistricts) {
      if (err) throw new Error (err)
    console.log(allDistricts)
    res.render('listings/new', {allDistricts: allDistricts})
  })
})




module.exports = router
