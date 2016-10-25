var mongoose = require('mongoose')

var districtSchema = new mongoose.Schema({

  area: [{
    type: String,
    required: true
  }],

  district: {
  type: String,
  required: true
  },

  listing_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }]

})

var District = mongoose.model('District', districtSchema)

module.exports = District
