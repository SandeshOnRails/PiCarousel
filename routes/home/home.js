module.exports = function (app, con, search) {


	 app.get('/', function(req, res){


	 	  search('all', con, result=>{

            console.log(result.length)
              
              res.render('home/index', {session_username: req.session.user || '', results: result})

        })
        
	 	 
	 })
}

