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

            getUsers: function(con, sql, callback) {
               
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

