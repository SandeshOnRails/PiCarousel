const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));


const con = require('./config/config.js')
const search = require('./models/test.js')
const checkForKey = require('./search-key/keycheck.js')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.set('view engine', 'ejs');


require('./routes/about.js')(express,app);

      app.get('/', function(req, res){

      res.render('about-us');   

      })

      app.get('/search', function(req, res){

      	 res.render('search')
      })

      app.get('/imgupload', function(req, res){

         res.render('imgupload')
      })

      app.post('/search/results', function(req, res){


      	  var actualResult = ''


          checkForKey(req.body.searchKey, function(result){

              var searchTerm = result
              console.log("Result: " + result)

              if(!searchTerm) searchTerm = req.body.searchKey
     	  
              search(searchTerm, con, function(result){

                        if(result.length > 0) {
                          	var showingResult = result[0].description
                          	var alldescription = showingResult.split(',')

                          	for(var i=0; i < alldescription.length; i++) {

                          		   if(alldescription[i].match(req.body.searchKey)) {

                          		   	  actualResult = alldescription[i]

                          		   }
                          	}
                             res.render('search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm})
                        }else {

                            res.render('search-results', {result: result})
                        }


              
              })
            
          })

      })


      app.post('/upload', function(req, res) {
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;
        console.log(req.files.sampleFile.name);
       
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('assets/'+req.files.sampleFile.name, function(err) {
          if (err)
            return res.status(500).send(err);
       
          res.send('File uploaded!');
        });
      });

app.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
