var mongoose = require('mongoose')

var listingSchema = new mongoose.Schema({
  address: String,
  listingType: String,
  propertyType: String,
  bedroom: String,
  price: Number,
  details: String
})

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing
