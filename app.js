

const express = require ('express') // express framework for creating the web server
const path = require('path')       // native node modules 'path' to concatenate the correct filepath
const bodyParser = require('body-parser') // body parser package to parse the requests from the query string
const app = express(); // initializing the express() instance with app
const con = require('./config/config.js') // import db connection from /config/config.js file
const search = require('./models/test.js') // search module for %LIKE SQL search to the database
const checkForKey = require('./search-key/keycheck.js') // reverse %LIKE SQL search to the database
const searchMatchPercent = require('./search-match-percent/searchMatchPercent.js') // search match % function
const fileUpload = require('express-fileupload') // file-upload package instance for express
var vt = require("node-virustotal"); // virus scanner package from mulitple different sources
const fs = require('fs') // file i/o native node.js module
const authenticate = require('./models/auth/authenticateUser.js') // user authentication function through database using user email
const register = require('./models/register.js') // register user function once the user is authenticated
var crypto = require('simple-crypto-js').default // user password encryption and decryption using AES-CBC encryption algorithm.
var secretKey = crypto.generateRandom() // generate random secret key
crypto = new crypto(secretKey) // initialize the instance of the crypto function using the secretkey



app.use(bodyParser.json()) // body parser package to support json format files as well
app.use(bodyParser.urlencoded({ extended: true })); 

// server static directories
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'assets'))); 

app.use(fileUpload({ limits: { fileSize: 2000000 } })); // use instance via the middleware and set file size limit to 2MB

// imgupload middleware. this middleware gets called every time there is an HTTP request to /imgupload route
app.use('/imgupload', function(req, res, next){
  next()
})




// template engine ejs set for server side rendering

app.set('view engine', 'ejs');

// ROUTES

require('./routes/about/about.js')(express,app);
require('./routes/search/search.js')(app,con,search,checkForKey,searchMatchPercent)
require('./routes/home/home.js')(app)
require('./routes/img-upload/upload.js')(app, vt, fs)
require('./routes/login/login.js')(app)
require('./routes/register/register.js')(app, authenticate, register, con, crypto)



app.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
