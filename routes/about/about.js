module.exports = function (express, app) {

   var aboutPages = ['ekta', 'david', 'cavit', 'arnold', 'mike', 'sandesh'];

  var flag = true;
	var router = express.Router();

	router.get('/', function(req, res, next) {
          
          res.render('about/about-us', {session_username: req.session.user || ''});
	});


	router.get('/:name', function(req, res, next){

          for(var i =0; i < aboutPages.length; i ++){
        if(aboutPages[i]== req.params.name){
              flag = false;
		res.render('about/'+req.params.name);

    }
}
   
        if(flag){
        res.writeHead(400);
        res.end("Sorry, the requested page was not found.");
   }


	});



	app.use('/about', router);



}
