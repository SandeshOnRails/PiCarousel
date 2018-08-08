module.exports = function (app,crypto) {


	 app.get('/admin', function(req, res){

	 	if (typeof req.session.user == 'undefined')
	 		res.redirect("/imgupload");
	 	else{
	 	 res.render('admin/viewAdmin',{account :req.session.user_accounttype} )
	 	}
	 })
}

