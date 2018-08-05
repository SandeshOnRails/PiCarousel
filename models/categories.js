module.exports = function (app, con, callback) {


	   con.connect(function(err) {

  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

})

  
 con.query("SELECT * FROM categorie", function(err, result, fields) {
              

      if (err) {

        console.log(err)

      }
        else { 

             console.log("Result: " + result)
             callback(result)


        }
});



}