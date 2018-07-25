

const registerUser = function (con, userData) {

    
con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database
 con.query("INSERT INTO  user (firstname, lastname, email, age, gender, accounttype, password) VALUES ('" + userData.first + "','" + userData.last + "','" + userData.email + "','" + userData.age+"','" + userData.gender +"','"+userData.accountType + "','"+ userData.pass + "')", function(err, result, fields) {
              

      if(err) {

        console.log(err)
      }

        else { 
             
               console.log(result)
        }
});


});
    





}




module.exports = registerUser