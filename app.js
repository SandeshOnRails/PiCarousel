const express = require ('express');

const path = require('path');

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



const con = require('./config/config.js')

//var search = require('./models/test.js')


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

require('./routes/about.js')(express,app);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res){

res.render('about-us');   

})

app.get('/search', function(req, res){

	 res.render('search')
})

app.post('/search/results', function(req, res){


	  var results = {

	  	  searchKey: req.body.searchKey
	  }
     
     con.getConnection(function(err, connection) {
  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

  connection.query("SELECT * FROM photos WHERE description LIKE '%" + req.body.searchKey + "%'", function(err, result, fields){

      if(err){
        console.log(err)
      }
        else { 
           
               res.render('search-results', {result: result})


        }
});

});
      


})




server.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
