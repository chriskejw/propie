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
  console.log('req:', req.body)
  console.log('req:', req.user._id)
    // Listing.create(req.body.listing, function(err, listing) {
    //   if (err) {
    //     res.send('an err during creation' + err)
    //   } else {
    //     res.redirect('/profile')
    //   }
    // })

  // var listing = req.body.listing;
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
      res.redirect('/')
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

    // Model.findByIdAndUpdate(id, [update], [options], [callback])

    router.put('/:id/modify', function(req, res) {
      // res.send("TEST")
      var newestListing = req.body.listing;
      // newestListing.user_id = req.user._id
      console.log("new listing: " + newestListing);
      Listing.findByIdAndUpdate(req.params.id, newestListing, function(err, listing){
        if(err) throw new Error(err);
        res.redirect('/profile');
      })

})
        // function(err, newestListing) {
            //   console.log(newestListing)
            //   if (err) {
            //     res.render('listings/modify')
            //   } else

              // res.redirect('/profile')
//       )
// })



  //  {
        //   newestlisting.title = req.body.newListing.title,
        //   newestlisting.address = req.body.newListing.address,
        //   newestlisting.district_id = req.body.newListing.district,
        //   newestlisting.listingType = req.body.newListing.listingType,
        //   newestlisting.propertyType = req.body.newListing.propertyType,
        //   newestlisting.price = req.body.newListing.price,
        //   newestlisting.size = req.body.newListing.size,
        //   newestlisting.tenure = req.body.newListing.tenure,
        //   newestlisting.bedroom = req.body.newListing.bedroom,
        //   newestlisting.bathroom = req.body.newListing.bathroom,
        //   newestlisting.details = req.body.newListing.details,
        //   newestlisting.contactName = req.body.newListing.contactName,
        //   newestlisting.contactNumber = req.body.newListing.contactNumber,
        //   newestlisting.user_id = req.user._id
        // }

    //DELETE LISTING============================================================

    // router.delete('/edit', function(req, res) {
    //   if (!req.isAuthenticated())
    //     res.redirect('/')
    // Listing.find({}, function(err, allListings) {









    //SHOW ALL LISTINGS============================================================

    router.route('/all')
      .post(function(req, res) { // create a listing
        var newListing = new listing({
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
        newListing.save(function(err) {
          if (err) throw new Error(err)
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
          res.send(err)[{ // update the listing info
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
          res.json({
            message: 'Listing updated!'
          })
        })
      })
    })
  })
  .delete(function(req, res) { // delete the listing with this id
    Listing.remove({
      _id: req.params.listing_id
    }, function(err, listing) {
      if (err)
        res.send(err);
      res.json({
        message: 'Listing deleted!'
      })
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
