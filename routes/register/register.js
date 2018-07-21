module.exports = function(app, authenticate, register, con, crypto) {


	  app.get('/register', (req, res)=> {

	  	    res.render('register/signUp')
	  })

	  app.post('/register', (req, res)=> {

	  	 // authenticate module to authenticate if the user with the email exists

	  	   
              authenticate(req.body.email, con,  function(isAuthenticated){
                

                // if the user is succesfully authenticated, register user
              	
              	 if(isAuthenticated) { regsiter(con, {

              	 	first: req.body.first, 
              	 	last: req.body.last,
              	 	email: req.body.email,
              	 	pass: crypto.encrypt(req.body.psw),
              	 	accountType: req.body.accountType,
              	 	age: req.body.age,
              	 	gender: req.body.gender


              	 })
              	 

              	 res.send('registration successful')
              	}

              })

              


	  })
}

