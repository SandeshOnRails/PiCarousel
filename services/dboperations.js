module.exports = {
 
            insertUser: function(con, data, callback) {
              // whatever


                  con.connect(function(err) {
                    if (err) throw err;
                    console.log("Connected!");
                  });

                  //console.log(myvara);
                  callback('connected');

            },
            getUsers: function(con, data, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from user", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(result);
                    //con.release();

                  });
            },

            insertImage: function(con, data, callback) {
                console.log("sql catching the form:"+data.imageDescription);
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



            
            getImages: function(con, data, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from image", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(result);
                    //con.release();

                  });
            },

            getCategories: function(con, data, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from categorie", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            
            getCategorieCount: function(con, data, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                this.resulta = con.query("Select count(*)  as itemcount from categorie", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },

            updateCategorie: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log(data.categorie);
                  console.log(data.id);

                var returnValue;
                this.resulta = con.query("update categorie set categorie = '"+data.categorie+"' where categorie_id = "+data.id, function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            insertCategorie: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log(data.categorie);
                  //console.log(data.id);

                var returnValue;
                this.resulta = con.query("insert into categorie (categorie) values('"+data.categorie+"')", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },

            deleteCategorie: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log(data.categorie);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                this.resulta = con.query("DELETE from categorie where categorie_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
 
};