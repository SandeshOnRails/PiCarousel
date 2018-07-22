module.exports = {
 
            insertUser: function(con, sql ,callback) {
              // whatever


                  con.connect(function(err) {
                    if (err) throw err;
                    console.log("Connected!");
                  });

                  //console.log(myvara);
                  callback('connected');

            },

            insertImage: function(con, sqldata, callback) {
                console.log("sql catching the form:"+sqldata.imageDescription);
                var returnValue;
                
                this.resulta = con.query("insert into image ("+
                  "filepath,"+
                  "photo_categorie_id"+
                  ",description,"+
                  "owner_user_id,"+
                  "adminverified,"+
                  "licencetype,"+
                  "privacy,"+
                  "published"+
                  ") values ('"+
                  sqldata.filepath+"',"+
                  sqldata.photo_categorie_id+",'"+
                  sqldata.description+"',"+
                  sqldata.owner_user_id+","+
                  sqldata.adminverified+","+
                  sqldata.licencetype+","+
                  sqldata.privacy+","+
                  sqldata.published+
    
                  ")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
                  
            },

            getUsers: function(con, sqldata, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from user", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(result);
                    //con.release();

                  });
            },

            
            getImages: function(con, sqldata, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from image", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(result);
                    //con.release();

                  });
            },

            getCategories: function(con, sql, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from categorie", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
 
};