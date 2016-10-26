var mongoose = require('mongoose')

var districtSchema = new mongoose.Schema({

  // area: [{
  //   type: String,
  //   required: true
  // }],   //---->JQUERY & MANUALLY INSERT AREAS INTO DISTRICTS do a get on the district when you select the DISTRICTS

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
