// set up and get all the tools we need=======================================

var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser') // parses information from POST

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)

var dotenv = require('dotenv')
var morgan = require('morgan')
var override = require('method-override')

var mongoose = require('mongoose') // mongo connection
mongoose.Promise = global.Promise

// configuration==============================================================

dotenv.load({
  path: '.env.' + process.env.NODE_ENV
})
mongoose.connect(process.env.MONGO_URI)
// app.use(override('_method'))

app.use(morgan('dev'))
app.set('view engine', 'ejs') // set up ejs for templating
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize()) // set up passport
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public')) // serve static files
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ // to parse form submitted data
  extended: true
}))

app.use(override(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

require('./config/passport')(passport) // pass passport for configuration

// routes=====================================================================

var listingsRoutes = require('./routes/listings')
var usersRoutes = require('./routes/users')
var listingsAPIRoutes = require('./routes/listings_api')

app.use('/listings', listingsRoutes)
app.use('/', usersRoutes)
app.use('/listings/api', listingsAPIRoutes)

// launch=====================================================================

app.listen(port)
console.log('Server started on port ' + port)
