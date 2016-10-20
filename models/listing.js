var mongoose = require('mongoose')

var listingSchema = new listing.Schema({
  name: String,
  district: Number,
})

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing
