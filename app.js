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

      var validator = require('./services/validateData.js');
      
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
//photo section
/*
                var ret = dbRequest.getUsers(con,"",function(result){
                console.log("in photo="+req.query.operation);
               

                        if(result.length > 0) {
                             res.render('admin', {operation:'photos'});
                        } else {

                            res.render('admin', {operation:'photos'});
                        }
              
                    });
                    */
           if (req.query.operation == "photos"){
            
              console.log("app.js photos");

                          if (req.query.submenu == "uploadimage"){
                             console.log("in photo="+req.query.submenu);

                              console.log("app.js photos");

                              dbRequest.getCategories(con,"",function(result){
                                    let selectdata = result;
                                      console.log("in photo="+req.query.operation);
               
                                   res.render('admin', {operation:'photos',submenu:'uploadimage',result:selectdata});
                                   console.log("data:"+JSON.stringify(selectdata[0].categorie_id));
                          
                                });

                          }


                          if (req.query.submenu == "list"){
                             console.log("in photo="+req.query.submenu);

                              console.log("app.js photos list");
                             
                                             res.render('admin', {operation:'photos',submenu:'list'});
                               

                          }

                         if ( !req.query.submenu  ){
                            res.render('admin', {operation:'photos',submenu:'list'});
                          }

          }
    //photo sub menu

        //upload image



        //upload image
        //upload image

  

       

        //upload image 

    //photo sub menu
//photo section
          if (req.query.operation == "categories"){

              var ret = dbRequest.getCategories(con,"",function(result){
 
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
      
      //image insert data to db after the upload
      function callInsertImage(data,res){
                      dbRequest.insertImage(con,data,function(result){
                                    console.log("data object:"+data.filepath);
                                   let selectdata = result;
                                   res.redirect('admin/?operation=photos&submenu=uploadimage' );
                          
                      });
            
      }
      //image insert end

      //image upload
      app.post('/upload', function(req, res) {
        //var req = req;
        //var res = res;
        console.log("form vriabe des: "+req.body.imageDescription);
        console.log("form vriabe id: "+req.body.imageCategorieId);
        console.log("form vriabe licencetype: "+req.body.licenceType);
        console.log("form vriabe privacy: "+req.body.privacy);
        console.log("form vriabe publish: "+req.body.publish);
        validator.checkText(req.body.imageDescription,function(status){
              
              if (status ==="ok"){
                    if (!req.files)
                      return res.status(400).send('No files were uploaded.');
         
                    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                    let sampleFile = req.files.sampleFile;
                    console.log(typeof req.files.sampleFile.mimetype);
         
                    // Use the mv() method to place the file somewhere on your server
                  sampleFile.mv('assets/'+req.files.sampleFile.name, function(err) {
                    if (err)
                      res.render('admin', {operation:'photos',submenu:'uploadimage',error:err});
                    else{
                      console.log("img categorie id :"+req.imageCategorieId);
                      let data={
            
                        filepath:'assets/'+req.files.sampleFile.name,           
                        photo_categorie_id :req.body.imageCategorieId,
                        description:req.body.imageDescription,        
                        owner_user_id:0,      
                        adminverified:0,      
                        licencetype:req.body.licenceType,        
                        privacy:req.body.privacy,            
                        published:req.body.publish          
                        
                      };

                      callInsertImage(data,res);
                      

                    }
                    
                  });
          }else{
             //res.send('admin',{operation:'photos',submenu:'uploadimage',error:valideData});
             console.log("-------------validator error :"+status);
             res.redirect('admin/?operation=photos&submenu=uploadimage&error='+ status);
            //res.render('admin', {operation:'photos',submenu:'uploadimage',error:valideData});
          }
        });
          

      });
      //image upload end

      //middleware to check if the file is valid jpeg or png format

      function isFileValid(req, res, next) {

        let error = 'whatever';

        let type = req.files.sampleFile.mimetype.toString();
        

          if(type === 'image/jpeg' || type === 'image/png') return next()
             res.render('admin', {operation:'photos',submenu:'uploadimage',error:error});
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
