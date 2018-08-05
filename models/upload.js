
            

module.exports = (con, data, callback) => {


con.connect(function(err) {

  if(err) {
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
// query the database
/*
INSERT INTO  image
 (filepath, photo_categorie, description, owner_user_id, adminverified,licencetype,privacy,published,deleted,photo_regdate,title) 
 VALUES ('','','',3,0,0,0,0,0,now(),'');
*/

//con.query("INSERT INTO  image (filepath, photo_categorie, description, owner_user_id, adminverified,licencetype,privacy,published,deleted,title)   VALUES ('" + data.filepath + "','" + data.category + "','" + data.description + "'," + data.userID + ",0,0,0,0,0,'')", function(err, result, fields) {
<
 con.query("INSERT INTO  image (filepath, photo_categorie, title, description, owner_user_id, licencetype,privacy) VALUES ('" + data.filename + "','" + data.category + "','" + data.title + "','" + data.description + "'," + data.userID + ",'" + data.licencetype +"','"+data.privacy +"')", function(err, result, fields) {
=
              

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