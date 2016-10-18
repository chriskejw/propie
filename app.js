var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
  // connect to mongoose
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
  // have to edit this!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://USERNAME:PASSWORD@ds061318.mlab.com:061318/DATABASENAME')
} else {
  mongoose.connect('mongodb://localhost/foodie')
}

app.set('view engine', 'ejs')
app.use(layout)
  // serve static files
app.use(express.static(__dirname + '/public'))
  // to parse ajax json req
app.use(bodyParser.json())
  // to parse form submitted data
app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(process.env.PORT || 33000)
console.log('Server started')
