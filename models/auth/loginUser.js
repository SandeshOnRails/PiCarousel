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
 con.query("SELECT password FROM user WHERE email = '" + user.email + "'", function(err, result, fields) {
              

      if(err) {

        console.log(err)
      }

        else { 

                  var password = (result[0].password).toString()

                  
                  var decrypted = crypto.decipher('secretKey', password)


             if(result.length > 0 && decrypted === user.pass) callback(true) // if the user exists callback function with false parameter

              else callback(false) // if the user does not exist, callback function with true paramter

        }
});


});
  


}

module.exports = loginUser