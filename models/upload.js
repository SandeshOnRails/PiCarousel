
            

module.exports = (con, data, callback) => {


con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database

 con.query("INSERT INTO  image (filepath, photo_categorie, title, description, owner_user_id, adminverified, published) VALUES ('" + data.filepath + "','" + data.category + "','" + data.title + "','" + data.description + "','" + data.userID + "','" + "false" +"','"+ "false')", function(err, result, fields) {
              

      if(err) {

        console.log(err)

      callback(false)
      }

        else { 
             
               console.log(result)
              
              callback(true)

        }
});


});
    
}