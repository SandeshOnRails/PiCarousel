
var check = function (key, pool, callback) {


var animal = key


var self = this

pool.getConnection(function(err, connection) {

  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

 connection.query("SELECT * FROM photos WHERE description LIKE '%" + animal + "%'", function(err, result, fields){

      if(err){
        console.log(err)
      }
        else { 
             
             callback(result)


        }
});


});
  

}




module.exports = check

