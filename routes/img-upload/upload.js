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

module.exports = function (app, upload, con, categories) {
var imagename="";
var Jimp = require('jimp');





app.get('/imgupload', function(req, res){

          
        
            if(req.session.user){

         res.render('img_upload/imgupload', {error:'', session_username: req.session.user || '', categories: categories})
      } 
      else {
          
         res.render('sign_in/signIn', {no_account_found:false})

       }

      })





      //post search results to the search-results.ejs page

     

      // post upload file. middleware function to check if the file is either png or jpeg format
      function imageresize (image){
        console.log("+++++++++++"+image);

           

      }

      app.post('/upload', isFileFormatValid, isFileSizeValid, function(req, res) {
       
      
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let myFile = req.files.sampleFile




       
         //Use the mv() method to place the file somewhere on your server
        myFile.mv('original/'+req.files.sampleFile.name, function(err) {
           imagename = req.files.sampleFile.name
          if (err)
            return res.status(500).send(err);

  

           

        });
        
            var filename = myFile.name
            var category = req.body.category
            var description = req.body.subject
            var title = req.body.title
            var licencetype = req.body.licenceType
            var privacy = req.body.privacy
            var user_id = req.session.user_id;
           

            function createThumb(result){
                  Jimp.read('original/'+filename)
                        .then(myimg => {
                            return myimg
                                .resize(144, 144) // resize
                                .quality(60) // set JPEG quality
                                .greyscale() // set greyscale
                                .write("assets/"+"th_"+user_id+"_"+result[0].photo_id+"_"+filename); // save
                        })
                        .catch(err => {
                            console.error(err);
                        });
                        res.redirect('/');
            }
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
                     
                      con.query("Select photo_id from image order by photo_id desc limit 1 ;", function (err, result , fields) {
                   
                          if (err) throw err;
                          console.log("in sendQuery Result: " + result);
                          createThumb(result);
                          //con.release();

                        });
                      
                 }

                 else {

                  res.send('not done')
                 }

            })

  

     });


}