module.exports = function (app,crypto) {


	 app.get('/admin', function(req, res){

	 	if (typeof req.session.user == 'undefined')
	 		res.redirect("/imgupload");
	 	else{

	 	console.log("password : "+crypto.decipher('secretKey','1b6bd58bde5f3729b55e3b7cdfadea3b' ))
	 	console.log("password admin: "+crypto.cipher('secretKey', 'member', 'aes256'));
	 	console.log("password : admin"+crypto.decipher('secretKey', crypto.cipher('secretKey', 'member', 'aes256')));
	 	console.log("when browse /admin page user name :"+ req.session.user);
	 	console.log("when browse /admin page user id :"+ req.session.user_id);
	 	console.log("when browse /admin page user account type :"+ req.session.user_accounttype);

	 	 res.render('admin/viewAdmin',{account :req.session.user_accounttype} )
	 	}
	 })
}

