const loginUser = function (user, con, crypto, callback) {

  // connect to the db

con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database
 con.query("SELECT user_id,password, firstname FROM user WHERE email = '" + user.email + "'", function(err, result, fields) {
              

      if(err) {

        console.log(err)
      }

        else { 

                if(result.length >= 1) {

                  var password = (result[0].password).toString()

                  
                  var decrypted = crypto.decipher('secretKey', password)


             if(result.length > 0 && decrypted === user.pass) callback(true, result[0].firstname,result[0].user_id) // if the user exists callback function with true parameter and username

              else callback(false, '') // if the user does not exist, callback function with false paramter, and empty string

        }
     else {

        callback(false, '')
    }
  }
});


});
  


}

module.exports = loginUser