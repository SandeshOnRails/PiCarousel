
var check = function (key, con, callback) {


con.connect(function(err) {

  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

 con.query("SELECT * FROM photos WHERE description LIKE '%" + key + "%'", function(err, result, fields) {
              

      if (err) {
        console.log(err)
      }
        else { 
             
             callback(result)


        }
});


});
  


}




module.exports = check

