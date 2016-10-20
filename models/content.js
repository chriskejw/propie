var mongoose = require('mongoose')

var contentSchema = new content.Schema({
  name: String,
  district: Number,
})

var Content = mongoose.model('Content', contentSchema)

module.exports = Content
