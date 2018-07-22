module.exports = function (app, authenticate, con) {



	   app.get('/login', (req, res) => {

	   	     res.render('sign_in/signIn', {no_account_found:false})
	   })


	   app.post('/login', (req, res) => {

	   	    authenticate(req.body.email, con, isAuthenticated => {

	   	    	  if(!isAuthenticated) res.send('logged in')
	   	    	  	else res.render('sign_in/signIn', {no_account_found: true})


	   	    })

	   })
}