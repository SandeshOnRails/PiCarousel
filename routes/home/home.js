module.exports = function (app) {


	 app.get('/', function(req, res){
         
         console.log("Home page session: " + req.session.user)
	 	 res.render('home/index', {session_username: req.session.user || ''})
	 })
}

