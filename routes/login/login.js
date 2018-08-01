module.exports = function (app, login, con, crypto) {



	   app.get('/login', (req, res) => {
                
      res.render('sign_in/signIn', {no_account_found:false})

	   })


	   app.post('/login', (req, res) => {

	   	    login({email:req.body.email,pass:req.body.psw}, con, crypto, function(isAuthenticated, username, userid){

	   	    	  if(isAuthenticated) {
                             
                             // set session for the user
                    req.session.user_id = userid;
                    req.session.user = username

                    console.log("User id: " + req.session.user_id)
                    
                    //after login before redirecting home page it needs to get all images from db and render the index page which requires images .
                    con.query("SELECT * FROM image", function(err, result, fields) {
              

						      if (err) {
						        console.log(err)
						      }
						        else { 
						             
						             res.render('home/index', {session_username: req.session.user, results:result})


						        }
					});

	   	    	  	

	   	    	  }
	   	    	  	else{ res.render('sign_in/signIn', {no_account_found: true}) }


	   	    })

	   })
}