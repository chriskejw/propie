var mongoose = require('mongoose')

var neighborhoodSchema = new neighborhood.Schema({
  name: String,
  district: Number,
})

var Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)

module.exports = Neighborhood
