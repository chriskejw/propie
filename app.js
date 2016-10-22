// set up and get all the tools we need ========================================
var express = require('express')
var app = express()
var port = process.env.PORT || 3000;
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session)
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var morgan = require('morgan')

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
app.use(layout) //
app.use(express.static(__dirname + '/public')) // serve static files
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ // to parse form submitted data
    extended: true
  }))
app.use(passport.initialize()) // set up passport
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
app.use(morgan('dev')) // ???
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

// launch ======================================================================
app.listen(port)
console.log('Server started on port ' + port)

// routes ======================================================================
// var frontendRoutes = require('./routes/listings') // go to index in routes folder
// var ajaxRoutes = require('./routes/listings_api') // go to index_api in routes folder
// var usersRoutes = require('./routes/users') // go to users in routes folder
// var usersAPIRoutes = require('./routes/users_api') // go to users_api in routes folder

// tells express to use the middlewares
// app.use('/listings', frontendRoutes) // connect localhost:xxxx/ to index in routes folder
// app.use('/api/listings', ajaxRoutes) // connect localhost:xxxx/api/index to index in routes folder
// app.use('/users', usersRoutes) // connect localhost:xxx/ to users in routes folder
// app.use('/api/users', usersAPIRoutes) // connect localhost:xxx/api/users to user_api in routes folder

// =======================================================
