

const express = require ('express'); // express framework for creating the web server
const path = require('path');          // native node modules 'path' to concatenate the correct filepath
const bodyParser = require('body-parser') // body parser package to parse the requests from the query string
const app = express(); // initializing the express() instance with app

app.use(bodyParser.json()) // body parser package to support json format files as well
app.use(bodyParser.urlencoded({ extended: true })); 

// server static directories
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'assets'))); 


const con = require('./config/config.js') // import db connection from /config/config.js file
const search = require('./models/test.js') // search module for %LIKE SQL search to the database
const checkForKey = require('./search-key/keycheck.js') // reverse %LIKE SQL search to the database


const fileUpload = require('express-fileupload'); // file-upload package instance for express
app.use(fileUpload()); // use instance via the middleware

// imgupload middleware. this middleware gets called every time there is an HTTP request to /imgupload route


app.use('/imgupload', function(req, res, next){
  next()
})


// template engine ejs set for server side rendering

app.set('view engine', 'ejs');

// require the about routes. this module uses the app instance to route the requests

require('./routes/about.js')(express,app);

// HTTP GET ROUTES


// '/' route to the about the team page

      app.get('/', function(req, res){

      res.render('about-us');   

      })

// '/search' route to the search engine

      app.get('/search', function(req, res){

      	 res.render('search')
      })

// '/imgupload' route to the image upload page

      app.get('/imgupload', function(req, res){

         res.render('imgupload', {error:false})
      })



// HTTP POST ROUTES


      //post search results to the search-results.ejs page

      app.post('/search/results', function(req, res){


      	  var actualResult = ''
            
      // function to see if the searchKey matches the database descriptions. callback function return true if the search result matches

      // this function does REVERSE %LIKE SQL search by getting all the description of each image and storing them

      // into an array and matching instance of it

          checkForKey(req.body.searchKey, function(result){

              var searchTerm = result

              // if the search result does not match the search term
              
              if(!searchTerm) searchTerm = req.body.searchKey

                // %LIKE SQL search
     	  
              search(searchTerm, con, function(result){
                         
                      
                          // find match percent through findMatchPercent() implemented below

                        if(result.length > 0) {

                          let matchPercent = findMatchPercent(req.body.searchKey, searchTerm).toFixed(0)

                          matchPercent = matchPercent +"% match"

                             res.render('search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm, matchPercent: matchPercent})
                        } 

                                 // if no match in the database then return empty result object to search-results page
                        else {

                            res.render('search-results', {result: result})
                        }


              
              })
            
          })

      })

      // post upload file. middleware function to check if the file is either png or jpeg format


      app.post('/upload', isFileValid, function(req, res) {
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;
        console.log(typeof req.files.sampleFile.mimetype);
       
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('assets/'+req.files.sampleFile.name, function(err) {
          if (err)
            return res.status(500).send(err);
       
          res.send('File uploaded!');
        });
      });


     


//middleware to check if the file is valid jpeg or png format

function isFileValid(req, res, next) {

  let error = 'whatever';

  let type = req.files.sampleFile.mimetype.toString();
  

    if(type === 'image/jpeg' || type === 'image/png') return next()
      res.render('imgupload', {error:error})
}

// find match percent 

function findMatchPercent (searchKey, tag) {

  let count = 0

     for(let i =0; i < tag.length; i++) {

           if(searchKey[i]) {
                
                if(tag[i]===searchKey[i]) count++
           }
     }

     if (searchKey.length > tag.length) return (count/searchKey.length * 100)
      else  return (count/tag.length * 100)
     
   }

 

app.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
