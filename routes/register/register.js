module.exports = function(app, authenticate, register, con, crypto) {


	  app.get('/register', (req, res)=> {

	  	    res.render('sign_up/signUp' ,{user_exists_error: false})
	  })

	  app.post('/register', (req, res)=> {

	  	

	  	 // authenticate module to authenticate if the user with the email exists
          
	  	   
              authenticate(req.body.email, con,  function(isAuthenticated){
                

                // if the user is succesfully authenticated, register user
              	
              	 if(isAuthenticated) { 

              	 	register(con, {

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

              	else {

              		res.render('sign_up/signUp', {user_exists_error: true})
              	}



              })

              


	  })



}
  







