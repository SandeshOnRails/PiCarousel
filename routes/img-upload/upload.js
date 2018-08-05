//middleware to check if the file is valid jpeg or png format

function isFileFormatValid(req, res, next) {


  let type = req.files.sampleFile.mimetype.toString();
  

    if(type === 'image/jpeg' || type === 'image/png') return next()
      res.render('img_upload/imgupload', {error:'Sorry only jpeg and png file format allowed', session_username: req.session.user || ''})
}

// middleware to check if the upload file is infected with malware




function isFileSizeValid (req, res, next) {

    let isInvalid = req.files.sampleFile.truncated // returns true if file size is over 2MB


    if(!isInvalid) return next()
      res.render('img_upload/imgupload', {error:'sorry file too big', session_username: req.session.user || ''})
}


var photoid="";
module.exports = function (app, upload, con,dbrequest) {
var imagename="";
var Jimp = require('jimp');



      app.get('/imgupload', function(req, res){

          
        
            if(req.session.user){

         res.render('img_upload/imgupload', {error:'', session_username: req.session.user || '', categories: ''})
      } 
      else {
          
         res.render('sign_in/signIn', {no_account_found:false})

       }

      })





      //post search results to the search-results.ejs page

     

      // post upload file. middleware function to check if the file is either png or jpeg format
      function imageresize (req,res,next){
               

               dbrequest.getUserLastImageId(con,req.session.user_id,function(result){

                  //console.log("itcnt:"+itemcount[0].itemcount);
                 res.locals.photoid =  result[0].photo_id;
                return next();
                });

           

      }

      app.post('/upload', isFileFormatValid, isFileSizeValid, imageresize,function(req, res,next) {

    
      next()

     },function(req,res,next){

        console.log("   ======"+res.locals.photoid);
                      
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
          
          let myFile = req.files.sampleFile;
          str = myFile.mimetype.split('/');
          let originalName = req.session.user_id+"_"+res.locals.photoid+"."+str[1];
          myFile.mv('original/'+originalName, function(err) {
         
            if (err)
              return res.status(500).send(err);

        });
            res.locals.originalName = originalName;

           

      next()
     },function(req,res){
            

            var filename = req.files.sampleFile.name
            var category = req.body.category
            var description = req.body.subject
            var title = req.body.title
            var licencetype = req.body.licenceType
            var privacy = req.body.privacy
            var user_id = req.session.user_id;

            upload(con, {

                filename: filename,
                category: category,
                description: description,
                licencetype: licencetype,
                privacy: privacy,
                title: title,
                userID: req.session.user_id,

            }, isSuccess => {

                 if(isSuccess){
                    Jimp.read('original/'+res.locals.originalName).then(function(myimg) {
                           
                                myimg.scaleToFit( 400, 300 );
                                myimg.quality(60) // set JPEG quality
                                myimg.greyscale() // set greyscale
                                myimg.write("assets/th_"+res.locals.originalName); // save
                        })
                        .catch(err => {
                            console.error(err);
                        });
                      res.redirect('/');
                 }

                 else {

                  res.send('not done')
                  
                 }

            })


     });


}