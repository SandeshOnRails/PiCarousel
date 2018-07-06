const express = require ('express');

const path = require('path');

const app = express();


var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'picarousel.ctftzezisj7n.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  port     : 3000,
  password : 'sfsucsc648',
  database : 'picarousel'
});
 
pool.getConnection(function(err, connection) {
  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/about.js')(express,app);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res){

res.render('about-us');   

}
)
server.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
