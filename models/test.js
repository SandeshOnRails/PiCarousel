
var search = function (key, con, callback) {


con.connect(function(err) {

  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

  console.log(key.toLowerCase())

  if(!(key.toLowerCase() === 'all')){

 con.query("SELECT * FROM image WHERE photo_categorie LIKE '%" + key + "%'", function(err, result, fields) {
              

      if (err) {
        console.log(err)
      }
        else { 
             console.log("Result: " + result)
             callback(result)


        }
});

}

else {

    con.query("SELECT * FROM image", function(err, result, fields) {
              

      if (err) {
        console.log(err)
      }
        else { 
             

             console.log("result: " + result)
             callback(result)


        }
});

}


});
  


}




module.exports = search

