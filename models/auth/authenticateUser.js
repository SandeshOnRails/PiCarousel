
const authenticateUser = function (userEmail, con, callback) {

  // connect to the db

con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database
 con.query("SELECT * FROM user WHERE email = '" + userEmail + "'", function(err, result, fields) {
              

      if(err) {

        console.log(err)
      }

        else { 
             
             if(result.length > 0) callback(false) // if the user exists callback function with false parameter

              else callback(true) // if the user does not exis, callback function with true paramter

        }
});


});
  


}

module.exports = authenticateUser