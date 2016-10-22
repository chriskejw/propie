var mongoose = require('mongoose')

var neighborhoodSchema = new mongoose.Schema({
  neighborhood: String,
  district: Number,
})

var Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)

module.exports = Neighborhood
