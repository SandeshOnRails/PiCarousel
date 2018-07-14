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
const t = require('./search-key/keycheck.js')
const server = require('http').createServer(app);
const io = require('socket.io')(server);



const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use('/imgupload', function(req, res, next){
  next()
})

app.set('view engine', 'ejs');


require('./routes/about.js')(express,app);

      app.get('/', function(req, res){

      res.render('about-us');   

      })

      app.get('/search', function(req, res){

      	 res.render('search')
      })

      app.get('/imgupload', function(req, res){

         res.render('imgupload', {error:false})
      })
      
      var dbRequest = require('./operationsdb/usersDbOp.js');
      app.get('/admin', function(req, res){


          if (req.query.operation == null){
            
            res.render('admin',{operation:''});
            console.log("app.js users");
          }

          if (req.query.operation == "users"){

            res.render('admin', {operation:'users'});
            console.log("app.js users");

          }

           if (req.query.operation == "photos"){
            
              console.log("app.js photos");
              var ret = dbRequest.getUsers(con,"",function(result){

                        if(result.length > 0) {
                             res.render('admin', {operation:'photos'});
                        } else {

                            res.render('admin', {operation:'photos'});
                        }
              
                    });

          }

          if (req.query.operation == "categories"){

              var ret = dbRequest.getCategories(con,"",function(result){
                  for (i=0 ; i<result.length; i++){
                      console.log("cat: "+(result[i].categorie)); 
                      console.log("id "+(result[i].categorie_id));   
                  };
                  //console.log("db categorie:"+JSON.stringify(result));    

                        if(result.length > 0) {
                             res.render('admin', {operation:'categories'});
                        } else {

                            res.render('admin', {operation:'categories'});
                        }
                    });
            

          
          console.log("app.js cat");
          }

          if (req.query.operation == "downloadanalytics"){
            res.render('admin', {operation:'downloadanalytics'});
          
          console.log("app.js down");
          }

          if (req.query.operation == "shared"){
            res.render('admin', {operation:'shared'});
          
          console.log("app.js down");
          }
      })


      //post search results

      app.post('/search/results', function(req, res){


      	  var actualResult = ''
            
      // function to see if the searchKey matches the database descriptions

          checkForKey(req.body.searchKey, function(result){

              var searchTerm = result
              
              if(!searchTerm) searchTerm = req.body.searchKey
     	  
              search(searchTerm, con, function(result){
                         

                        if(result.length > 0) {

                          let matchPercent = findMatchPercent(req.body.searchKey, searchTerm).toFixed(0)
                          matchPercent = matchPercent +"% match"

                             res.render('search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm, matchPercent: matchPercent})
                        } else {

                            res.render('search-results', {result: result})
                        }


              
              })
            
          })

      })

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
