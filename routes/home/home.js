module.exports = function (app) {


	 app.get('/', function(req, res){
         
         console.log("Home page session: " + req.session.user)
	 	 res.render('home/homepage', {session_username: req.session.user || ''})
	 })
}

