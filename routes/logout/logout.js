module.exports = function (app) {

	   app.get('/logout', (req, res)=> {
              
              if(req.session.user) {

              	req.session.destroy(err => {
              		 console.log(err)
              	})
               res.redirect('/')
           }
           else {

           	    res.redirect('/')
           }
	   })
}