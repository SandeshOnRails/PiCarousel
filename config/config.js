
var mysql = require('mysql');

var pool  = mysql.createConnection({
  host     : 'picarousel.ctftzezisj7n.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  port     : 3000,
  password : 'sfsucsc648',
  database : 'picarousel'
});


module.exports = pool;