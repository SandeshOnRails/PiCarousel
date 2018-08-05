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


      app.post('/upload', isFileFormatValid, isFileSizeValid, function(req, res) {
        
      
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let myFile = req.files.sampleFile




       
         //Use the mv() method to place the file somewhere on your server
        sampleFile.mv('assets/'+req.files.sampleFile.name, function(err) {
          if (err)
            return res.status(500).send(err);

           

        });
        
           var filename = myFile.name
            var category = req.body.category
            var description = req.body.subject
            var title = req.body.title
            var licencetype = req.body.licenceType
            var privacy = req.body.privacy

           

           
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

                      res.redirect('/');
                 }

                 else {

                  res.send('not done')
                 }

            })

               

     });

}