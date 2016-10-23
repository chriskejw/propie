var mongoose = require('mongoose')

var listingSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  district: {
    type: Number,
    required: true
  },

  neighborhood_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Neighborhood'
  },

  listingType: {
    type: String,
    required: String
  },

  propertyType: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  size: {
    type: Number,
    required: true
  },

  tenure: {
    type: String,
    required: true
  },

  bedroom: {
    type: Number,
    required: true
  },

  bathroom: {
    type: Number,
    required: true
  },

  details: String,

  contactNumber: Number,

  postDate: {
    type: Date,
    default: Date.now
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing
