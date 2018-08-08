module.exports = function (app, con, search, categories) {


	 app.get('/', function(req, res){


	 	  search('all', con, result => {


               categories(app, con, categories => {
                      
              

              res.render('home/index', {session_username: req.session.user || '', results: result, categories: categories})

        })

                })
        
	 	 
	 })
}

