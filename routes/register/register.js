module.exports = function(app, authenticate, register, con, crypto) {


	  app.get('/register', (req, res)=> {

    

	  	    res.render('sign_up/signUp' ,{user_exists_error: false})
	  })

	  app.post('/register', (req, res)=> {

	  	

	  	 // authenticate module to authenticate if the user with the email exists
          
	  	   
              authenticate(req.body.email, con,  function(isAuthenticated){
                

                // if the user is succesfully authenticated, register user
              	
              	 if(isAuthenticated) { 
                        
                  req.session.username = req.body.first

              	 	register(con, {

              	 	first: req.body.first, 
              	 	last: req.body.last,
              	 	email: req.body.email,
              	 	pass: crypto.cipher('secretKey', req.body.psw, 'aes256'),
              	 	accountType: req.body.accountType,
              	 	age: req.body.age,
              	 	gender: req.body.gender


              	 })
              	 
                 res.send('registration success')

              	}

              	else {

              		res.render('sign_up/signUp', {user_exists_error: true})
              	}



              })

              


	  })



}
  







