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


	  var actualResult = ''


	  var searchTerm = checkForKey(req.body.searchKey)
       

	  if(!searchTerm) searchTerm = req.body.searchKey
	  
     
     con.getConnection(function(err, connection) {

  if(err){
  	console.log("error connecting: " + err)
  }
  else {
  	console.log('connection successful')
  }

  connection.query("SELECT * FROM photos WHERE description LIKE '%" + searchTerm + "%'", function(err, result, fields){

      if(err) {
      	console.log("SQL ERROR AT : " + err)
      }
        else { 
                  if(result.length > 0) {
        	var showingResult = result[0].description
        	var alldescription = showingResult.split(',')

        	for(var i=0; i < alldescription.length; i++) {

        		   if(alldescription[i].match(req.body.searchKey)) {

        		   	  actualResult = alldescription[i]

        		   }
        	}
        

              console.log(req.body.searchKey)
              console.log(searchTerm)
        	
           
               res.render('search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm})
           }

           else {

          res.render('search-results', {result: result})


           }


        }
});

});
      


})


const checkForKey = (searchKey)=> {
  
  var database = ['parrot', 'bird', 'dog', 'kingfisher', 'huskey', 'cute']


             for(var i =0; i < database.length; i++) {

             	   if(database[i].length > searchKey.length) {
                         
                         if(database[i].match(searchKey)) return database[i]
             	   }

             	else {
                         
                         if(searchKey.match(database[i])) return database[i]

             	}
             }
   return ''

                
}


server.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
