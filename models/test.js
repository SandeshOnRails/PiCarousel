
module.exports = function (key, pool) {


var animal = key

 
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
           


        }
});

});
  
  console.log(results)
  return results
}


