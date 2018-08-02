module.exports = function (app) {


	 app.get('/admin', function(req, res){
	 	console.log("when browse /admin page user name :"+ req.session.user);
	 	console.log("when browse /admin page user id :"+ req.session.user_id);
	 	console.log("when browse /admin page user account type :"+ req.session.user_accounttype);

	 	 res.render('admin/viewAdmin')
	 })
}

