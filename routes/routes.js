module.exports = function (express, app) {

	let router = express.Router();

	router.get('/', function(req, res, next) {
          
          res.render('about-us', {});
	});


	router.get('/about/sandesh', function(req, res, next){

		res.render('about-me', {});
	})

	router.get('/about/michael', function(req, res, next) {
          
          res.render('mike', {});
	});
  
    router.get('/about/arnold', function(req, res, next){

    	res.render('arnold', {});
    });
    
    router.get('/about/cavit', function(req, res, next){

    	res.render('cavit', {});
    });

    router.get('/about/david', function(req, res, next){

    	res.render('david', {});
    })

    router.get('/about/ekta', function(req, res, next){
    	res.render('ekta',{});
    })


	app.use('/', router);

    app.use('/about/sandesh', router);

    app.use('/about/michael', router);

    app.use('/about/ekta', router);

    app.use('/about/arnold', router);

    app.use('/about/cavit', router);

    app.use('/about/david', router);


}