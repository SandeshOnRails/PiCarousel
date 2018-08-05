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
            getOneUser: function(con,user, callback) {
                
               
                var returnValue;
                this.resulta = con.query("Select * from user where user_id="+user.id+" ;", function (err, result , fields) {
                   
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
            editUserProfile: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  console.log("edit user profile called");
                  console.log("id="+data.id);
                  console.log(data.firstname);
                  console.log(data.lastname);
                  console.log(data.email);
                  console.log(data.age);
                  console.log("gender"+data.gender);
            
                var returnValue;
                this.resulta = con.query("update user set "+
                  "firstname = '"+data.firstname+"' ,"+
                  "lastname = '"+data.lastname+"' ,"+
                  "email = '"+data.email+"' ,"+
                  "age = "+data.age+" ,"+
                  "gender = '"+data.gender+"' "+
                  "where user_id = "+data.id, function (err, result , fields) {
                   
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
            getImageCountBycondition: function(con,listcondition, data, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                if (listcondition == "all"){
                  this.resulta = con.query("Select count(*)  as itemcount from image ", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
                }else{
                  this.resulta = con.query("Select count(*)  as itemcount from image where adminverified='"+listcondition+"'", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
              }
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
            getUserImages: function(con,page,recPerPage, user, callback) {
                let first =(page-1)*recPerPage;
               
                var returnValue;
                this.resulta = con.query("Select * from image where owner_user_id = "+user.id+" and deleted= 0 order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getUserImagesByFilter: function(con,page,recPerPage, listcondition,user, callback) {
                let first =(page-1)*recPerPage;
                var sql="";
                
                if (listcondition.licence != "all" ){
                  sql = sql + " and licencetype = '"+listcondition.licence+"' ";
                }
                if (listcondition.privacy != "all" ){
                  sql = sql + " and privacy = '"+listcondition.privacy+"' ";
                }
                if (listcondition.status != "all" ){
                  sql = sql + " and adminverified = '"+listcondition.status+"' ";
                }

                console.log("sql : "+sql);
                var returnValue;
                this.resulta = con.query("Select * from image where owner_user_id = "+user.id+" and deleted = 0 "+ sql +" order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getUserLastImageId: function(con, id, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                this.resulta = con.query("Select photo_id  from image where owner_user_id = "+id+" order by photo_id desc limit 1", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            getUserImageCount: function(con, user, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                var returnValue;
                this.resulta = con.query("Select count(*)  as itemcount from image where owner_user_id = "+user.id+" and deleted =0", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            //filter by licence,privacy and status
            getUserImageCountByFiler: function(con,listcondition, user, callback) {
               //SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
                console.log("db"+listcondition.licence);
                console.log("db"+listcondition.privacy);
                console.log("db"+listcondition.status);
               
                var sql="";
                
                if (listcondition.licence != "all" ){
                  sql = sql + " and licencetype = '"+listcondition.licence+"' ";
                }
                if (listcondition.privacy != "all" ){
                  sql = sql + " and privacy = '"+listcondition.privacy+"' ";
                }
                if (listcondition.status != "all" ){
                  sql = sql + " and adminverified = '"+listcondition.status+"' ";
                }

                console.log("sql : "+sql);

               
                  this.resulta = con.query("Select count(*)  as itemcount from image where owner_user_id ="+user.id+" and deleted =0"+sql, function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
                
            },
            editPropertiesUserImages: function(con, data, callback) {

                //this.resulta = con.query("update categorie set categorie = "+data.categorie+" where categorie_id = "+data.id, function (err, result , fields) {
                  //console.log(data.categorie);
                  //console.log(data.id);
                      switch(data.useraction) {
                            case "delete":
                                sql = "update image set deleted = 1 where photo_id IN("+data.id+")"
                                console.log("delete")
                              break;
                            case "public":
                                sql = "update image set privacy = 'public' where photo_id IN("+data.id+")"
                              break;
                            case "private":
                                sql = "update image set privacy = 'private' where photo_id IN("+data.id+")"
                              break;          
                            case "commercial":
                                sql = "update image set licencetype = 'commercial' where photo_id IN("+data.id+")"
                              break;          
                            case "free":
                                sql = "update image set licencetype = 'free' where photo_id IN("+data.id+")"
                              break;                              
                            default:
                                console.log("error to receive image set properties for admin section");
                      } 

                var returnValue;
                //DELETE from tablename WHERE id IN (1,2,3,...,254);
                this.resulta = con.query(sql, function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
            },
            //only for admin verified condition
            getImagesBycondition: function(con,page,recPerPage,listcondition, data, callback) {
                console.log("condition:"+listcondition);
                let first =(page-1)*recPerPage;
               
                var returnValue;
                if (listcondition == "all"){
                    this.resulta = con.query("Select * from image order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
                }else{

                this.resulta = con.query("Select * from image where adminverified='"+listcondition+"' order by photo_id desc limit "+first+","+recPerPage+" ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                  });
              }
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
            getCategoriesAll: function(con, data, callback) {
               
               
                var returnValue;
                this.resulta = con.query("Select * from categorie ;", function (err, result , fields) {
                   
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