
const authenticateUser = function (userEmail, con, callback) {

  
con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

 con.query("SELECT * FROM user WHERE email=" + userEmail, function(err, result, fields) {
              

      if(err) {

        console.log(err)
      }

        else { 
             
             if(result.length > 0) callback(false)

              else callback(true)

        }
});


});
  


}

module.exports = authenticateUser