//middleware to check if the file is valid jpeg or png format

function isFileFormatValid(req, res, next) {


  let type = req.files.sampleFile.mimetype.toString();
  

    if(type === 'image/jpeg' || type === 'image/png') return next()
      res.render('img_upload/imgupload', {error:'Sorry only jpeg and png file format allowed'})
}

// middleware to check if the upload file is infected with malware




function isFileSizeValid (req, res, next) {

    let isInvalid = req.files.sampleFile.truncated // returns true if file size is over 2MB


    if(!isInvalid) return next()
      res.render('img_upload/imgupload', {error:'sorry file too big'})
}

module.exports = function (app) {


app.get('/imgupload', function(req, res){

         res.render('img_upload/imgupload', {error:''})
      })





      //post search results to the search-results.ejs page

     

      // post upload file. middleware function to check if the file is either png or jpeg format


      app.post('/upload', isFileFormatValid, isFileSizeValid, function(req, res) {
        if (!req.files)
          return res.status(400).send('No files were uploaded.');
       
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile




       
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('assets/'+req.files.sampleFile.name, function(err) {
          if (err)
            return res.status(500).send(err);


       
          res.send('File uploaded!');
        });
     });

}