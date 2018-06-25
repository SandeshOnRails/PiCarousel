module.exports = function (express, app) {

   
   var aboutPages = ['david', 'ekta', 'arnold', 'sandesh', 'cavit', 'mike'];


	var router = express.Router();

	router.get('/', function(req, res, next) {
          
          res.render('about-us', {});
	});


	router.get('/:name', function(req, res, next){


        if(aboutPages.includes(req.params.name)){

		res.render(req.params.name);

    }

    else {

        res.writeHead(400);
        res.end("Sorry, the requested page was not found.");
    }


	});



	app.use('/about', router);



}