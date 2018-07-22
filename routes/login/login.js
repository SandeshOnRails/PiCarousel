module.exports = function (app, login, con, crypto) {



	   app.get('/login', (req, res) => {
                
      res.render('sign_in/signIn', {no_account_found:false})

	   })


	   app.post('/login', (req, res) => {

	   	    login({email:req.body.email,pass:req.body.psw}, con, crypto, function(isAuthenticated){

	   	    	  if(isAuthenticated) {
                             
                             // set session for the user
                       
                    req.session.user = req.body.email
	   	    	  	res.send("Welcome "  + req.session.user)

	   	    	  }
	   	    	  	else{ res.render('sign_in/signIn', {no_account_found: true}) }


	   	    })

	   })
}