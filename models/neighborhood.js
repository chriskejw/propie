var mongoose = require('mongoose')

var neighborhoodSchema = new mongoose.Schema({

  neighborhood: String,

  district: Number,

  listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }

})

var Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)

module.exports = Neighborhood
