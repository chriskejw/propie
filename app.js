// set up and get all the tools we need ========================================
var express = require('express')
var app = express()
var port = process.env.PORT || 3000;
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var dotenv = require('dotenv')
var mongoose = require('mongoose')

// configuration ===============================================================
mongoose.Promise = global.Promise
if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://USERNAME:PASSWORD@ds061318.mlab.com:061318/DATABASENAME') // connect to our database
} else {
  mongoose.connect('mongodb://localhost/propie') // connect to local
}
// load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({
  path: '.env.' + process.env.NODE_ENV
})

app.set('view engine', 'ejs') // set up ejs for templating
app.use(layout) // ???
app.use(express.static(__dirname + '/public')) // serve static files
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ // to parse form submitted data
    extended: true
  }))
app.use(passport.initialize()) // ???
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// launch ======================================================================
app.listen(port)
console.log('Server started on port ' + port)

// routes ======================================================================
var frontendRoutes = require('./routes/index')
var ajaxRoutes = require('./routes/index_api')
var usersRoutes = require('./routes/user')
var usersAPIRoutes = require('./routes/user_api')

app.use('/', frontendRoutes) // only render ejs files
app.use('/api/index', ajaxRoutes) // only handle ajax request
app.use('/', usersRoutes) // only render ejs files
app.use('/api/users', usersAPIRoutes) // only handle ajax request
