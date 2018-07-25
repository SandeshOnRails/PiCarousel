module.exports = (con, data, callback) => {


con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database

 con.query("INSERT INTO  image (filepath, photo_categorie, description, owner_user_id, adminverified, privacy, published, deleted) VALUES ('" + data.filepath + "','" + data.category + "','" + data.description + "','" + data.userID + "','" + "false" +"','" + data.privacy +"','"+ "false" + "','"+ "false" + "')", function(err, result, fields) {
              

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