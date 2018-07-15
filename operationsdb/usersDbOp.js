//const dbcon = require('../config/config.js');
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
               
                var returnValue;
                this.resulta = con.query("insert into image (filepath,description) values ('c.jpg','ver')", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(fields);
                    //con.release();

                  });
            },

            getUsers: function(con, sqldata, callback) {
               
                var returnValue;
                this.resulta = con.query("Select * from user", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + fields);
                    callback(fields);
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

