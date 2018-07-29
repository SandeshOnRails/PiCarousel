
var mysql = require('mysql');


var con  = mysql.createConnection({

  host     : 'picarousel.ctftzezisj7n.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  port     : 3000,
  password : 'sfsucsc648',
  database : 'picarousel'

});

/*
var con  = mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : 'cavit',
  database : 'picarousel'

});
*/



module.exports = con;