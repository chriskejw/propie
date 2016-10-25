var express = require('express')
var router = express.Router()

var District = require('../models/district');
var Listing = require('../models/listing');
var User = require('../models/user');

//NEW LISTING FORM=====================================================

router.get('/new', function (req, res) {
  Listing.find({}, function (err, allListings) {
    if (err) throw new Error (err)
  District.find({}, function (err, allDistricts) {
      if (err) throw new Error (err)
    console.log(allDistricts + allListings)
    res.render('listings/new', {
      message1: req.flash('loginMessage'),
      message2: req.flash('signupMessage'),
      allListings: allListings,
      allDistricts: allDistricts
    })
  })
  })
})

// create new listing
router.post('/new', function(req, res) {
  console.log('req:', req.body)
  Listing.create(req.body.listing, function (err, listing) {
    if (err) {
      res.send('an err during creation' + err)
    } else {
      res.redirect('/profile')
    }
  })
})

//SHOW ALL LISTINGS============================================================

router.route('/all')
  .post(function(req,res){ // create a listing
    var listing = new Listings ({
      title: req.body.title,
      address: req.body.address,
      district_id: req.body.district,
      area: req.body.area,
      listingType: req.body.listingType,
      propertyType: req.body.propertyType,
      price: req.body.price,
      size: req.body.size,
      tenure: req.body.tenure,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      details: req.body.details,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      postDate: req.body.postDate,
      user_id: req.body.user_id
    })
    newListing.save(function (err){
      if(err) throw new Error(err)
   })
  })
  .get(function(req, res) { // get all listings
    Listing.find(function(err, listings) {
      if (err)
        res.send(err);
      res.json(listings);
    })
  })

//SHOW ONE LISTING===========================================================

// get the listing with this id
router.get('/details/:listing_id', function(req, res) {
    Listing.findById(req.params.listing_id, function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing)
    })
  })

//UPDATE ONE LISTING=========================================================

router.get('/details/:listing_id', function(req, res) {
    Listing.findById(req.params.listing_id, function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing)
    })
  })
// update the listing with this id
router.put('/details/update/:listing_id', function(req, res) {
    // use listing model to find the listing
    Listing.findById(req.params.listing_id, function(err, lising) {
      if (err)
        res.send(err)
          [{ // update the listing info
          title: req.body.title,
          address: req.body.address,
          // district: req.body.district,
          // area: req.body.area,
          listingType: req.body.listingType,
          propertyType: req.body.propertyType,
          price: req.body.price,
          size: req.body.size,
          tenure: req.body.tenure,
          bedroom: req.body.bedroom,
          bathroom: req.body.bathroom,
          details: req.body.details,
          contactName: req.body.contactName,
          contactNumber: req.body.contactNumber,
          postDate: req.body.postDate
          }]

          listng.save(function(err) { // save the listing
            if (err)
              res.send(err);
            res.json({ message: 'Listing updated!'})
          })
    })
  })
  .delete(function(req, res) { // delete the listing with this id
    Listing.remove({
      _id: req.params.listing_id
    }, function(err, listing) {
      if (err)
        res.send(err);
      res.json({ message: 'Listing deleted!'})
    })
  })
//============================================================================

module.exports = router

//============================================================================

// //NEW LISTING FORM=====================================================
//
// router.get('/new', function (req, res) {
//   Listing.find({}, function (err, allListings) {
//     if (err) throw new Error (err)
//   District.find({}, function (err, allDistricts) {
//       if (err) throw new Error (err)
//     console.log(allDistricts + allListings)
//     res.render('listings/new', {
//       message1: req.flash('loginMessage'),
//       message2: req.flash('signupMessage'),
//       allListings: allListings,
//       allDistricts: allDistricts
//     })
//   })
//   })
// })
//
// // create new listing
// router.post('/new', function(req, res) {
//   console.log('req:', req.body)
//   Listing.create(req.body.listing, function (err, listing) {
//     if (err) {
//       res.send('an err during creation' + err)
//     } else {
//       res.redirect('/profile')
//     }
//   })
// })
//
// //GET ALL LISTINGS============================================================
//
// router.route('/all')
//   .post(function(req,res){ // create a listing
//     var listing = new Listings ({
//       title: req.body.title,
//       address: req.body.address,
//       // district: req.body.district,
//       // area: req.body.area,
//       listingType: req.body.listingType,
//       propertyType: req.body.propertyType,
//       price: req.body.price,
//       size: req.body.size,
//       tenure: req.body.tenure,
//       bedroom: req.body.bedroom,
//       bathroom: req.body.bathroom,
//       details: req.body.details,
//       contactName: req.body.contactName,
//       contactNumber: req.body.contactNumber,
//       postDate: req.body.postDate
//     })
//     newListing.save(function (err){
//       if(err) throw new Error(err)
//    })
//   })
//   .get(function(req, res) { // get all listings
//     Listing.find(function(err, listings) {
//       if (err)
//         res.send(err);
//       res.json(listings);
//     })
//   })
//
// //GET A SINGLE LISTING========================================================
//
// // router.get('/details', function (req, res) {
// //     console.log(req.user)
// //     res.render("listings/details")
// // })
//
// router.route('/:listing_id')
//   .get(function(req, res) { // get the listing with this id
//     Listing.findById(req.params.listing_id, function(err, listing) {
//       if (err)
//         res.send(err);
//       res.json(listing)
//     })
//   })
//   .put(function(req, res) { // update the listing with this id
//     // use listing model to find the listing
//     Listing.findById(req.params.listing_id, function(err, lising) {
//       if (err)
//         res.send(err)
//           [{ // update the listing info
//           title: req.body.title,
//           address: req.body.address,
//           // district: req.body.district,
//           // area: req.body.area,
//           listingType: req.body.listingType,
//           propertyType: req.body.propertyType,
//           price: req.body.price,
//           size: req.body.size,
//           tenure: req.body.tenure,
//           bedroom: req.body.bedroom,
//           bathroom: req.body.bathroom,
//           details: req.body.details,
//           contactName: req.body.contactName,
//           contactNumber: req.body.contactNumber,
//           postDate: req.body.postDate
//           }]
//
//           listng.save(function(err) { // save the listing
//             if (err)
//               res.send(err);
//             res.json({ message: 'Listing updated!'})
//           })
//     })
//   })
//   .delete(function(req, res) { // delete the listing with this id
//     Listing.remove({
//       _id: req.params.listing_id
//     }, function(err, listing) {
//       if (err)
//         res.send(err);
//       res.json({ message: 'Listing deleted!'})
//     })
//   })
