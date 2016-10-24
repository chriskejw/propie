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

  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District'
  },

  listingType: {
    type: String,
    required: true
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

  contactName: {
    type: String,
    required: true
  },

  contactNumber: {
    type: Number,
    required: true
  },

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
