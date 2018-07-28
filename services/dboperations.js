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
            getUsers: function(con,page,recPerPage, data, callback) {
                let first =(page-1)*recPerPage;
               
                var returnValue;
                this.resulta = con.query("Select * from user order by user_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getUserCount: function(con, data, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                this.resulta = con.query("Select count(*)  as itemcount from user", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },

            suspendUser: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log(data.categorie);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                this.resulta = con.query("UPDATE user SET suspend = 1 where user_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            activateUser: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log(data.categorie);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                this.resulta = con.query("UPDATE user SET suspend = 0 where user_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
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


           getImageCount: function(con, data, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                this.resulta = con.query("Select count(*)  as itemcount from image", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            
            getImages: function(con,page,recPerPage, data, callback) {
                let first =(page-1)*recPerPage;
               
                var returnValue;
                this.resulta = con.query("Select * from image order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getImagesBycondition: function(con,page,recPerPage,listcondition, data, callback) {
                console.log("condition:"+listcondition);
                let first =(page-1)*recPerPage;
               
                var returnValue;
                this.resulta = con.query("Select * from image where adminverified='"+listcondition+"' order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            verifiedImage: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log("photoid"+data.id);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                
                this.resulta = con.query("UPDATE image SET adminverified = 'verified' where photo_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            waitingImage: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log("photoid"+data.id);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                
                this.resulta = con.query("UPDATE image SET adminverified = 'waiting' where photo_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            rejectedImage: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log("photoid"+data.id);
                  //console.log(data.id);

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                
                this.resulta = con.query("UPDATE image SET adminverified = 'rejected' where photo_id IN("+data.id+")", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getCategories: function(con,page,recPerPage, data, callback) {
                let first =(page-1)*recPerPage;
               
                var returnValue;
                this.resulta = con.query("Select * from categorie order by categorie_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
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