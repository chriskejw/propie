var express = require('express')
var router = express.Router()

var District = require('../models/district');
var Listing = require('../models/listing');
var User = require('../models/user');

//NEW LISTING FORM=====================================================

router.get('/new', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/')
  Listing.find({}, function(err, allListings) {
    if (err) throw new Error(err)
    District.find({}, function(err, allDistricts) {
      if (err) throw new Error(err)
      console.log(allDistricts + allListings)
      res.render('listings/new', {
        message1: req.flash('loginMessage'),
        message2: req.flash('signupMessage'),
        allListings: allListings,
        allDistricts: allDistricts,
        user: req.user.local.name,
        email: req.user.local.email,
        dateJoined: ((req.user.local.dateJoined).toLocaleDateString())
      })
    })
  })
})

// create new listing
router.post('/new', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/') // if not logged in, redirect to login page
  console.log('req:', req.body)
  console.log('req:', req.user._id)

  var newListing = new Listing({
    title: req.body.listing.title,
    address: req.body.listing.address,
    district_id: req.body.listing.district,
    listingType: req.body.listing.listingType,
    propertyType: req.body.listing.propertyType,
    price: req.body.listing.price,
    size: req.body.listing.size,
    tenure: req.body.listing.tenure,
    bedroom: req.body.listing.bedroom,
    bathroom: req.body.listing.bathroom,
    details: req.body.listing.details,
    contactName: req.body.listing.contactName,
    contactNumber: req.body.listing.contactNumber,
    user_id: req.user._id
  })
  newListing.save(function(err) {
    if (err) throw new Error(err)
  })
  res.redirect('/profile')
})

//MODIFY LISTING============================================================

router.get('/:id/modify', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/') // if not logged in, redirect to login page
  District.find({}, function(err, allDistricts) {
    if (err) throw new Error(err)
    Listing.findById(req.params.id, function(err, selectedListing) {
      console.log(selectedListing)
      res.render('listings/modify', {
        selectedListing: selectedListing,
        allDistricts: allDistricts,
        user: req.user.local.name,
        email: req.user.local.email,
        dateJoined: ((req.user.local.dateJoined).toLocaleDateString()),
        message1: req.flash('loginMessage'),
        message2: req.flash('signupMessage')
      })
    })
  })
})

router.put('/:id/modify', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/') // if not logged in, redirect to login page
  var newestListing = req.body.listing;
  console.log("new listing: " + newestListing);
  Listing.findByIdAndUpdate(req.params.id, newestListing, function(err, listing) {
    if (err) throw new Error(err);
    res.redirect('/profile');
  })
})

//DELETE LISTING============================================================

router.delete('/profile/:id', function(req, res) {
  if (!req.isAuthenticated())
    res.redirect('/') // if not logged in, redirect to login page
//     console.log("hey delete")
Listing.findByIdAndRemove(req.params.id, function(err, allListings) {
    if (err) { throw new Error (err)
      console.log("cannot delete")
      res.render('users/profile')
    } else {
      console.log("deleted")
      res.redirect('/profile')
    }
  })
})

//==========================================================================

module.exports = router

//==========================================================================

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

// router.delete('/:id', function (req, res) {
//   console.log('back at delete router')
//   console.log(req.body.newAsset)
//   console.log('delete router id: ' + req.params.id)
//
//   asset.remove( {_id : req.params.id}, function (err) {
//     if (err) return handleError(err);
//     // removed!
// });
// res.send('done')
// })
//
// router.delete('/:id', function (req, res) {
//   res.send('asset id delete')
// })
