const express = require ('express');

const path = require('path');

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true })); 



const con = require('./config/config.js')

const search = require('./models/test.js')

const checkForKey = require('./search-key/keycheck.js')





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


    checkForKey(req.body.searchKey, function(result){
      var searchTerm = result
      console.log("Result: " + result)




	  if(!searchTerm) searchTerm = req.body.searchKey
	  
         
         search(searchTerm, con, function(result){

                  if(result.length > 0) {
        	var showingResult = result[0].description
        	var alldescription = showingResult.split(',')

        	for(var i=0; i < alldescription.length; i++) {

        		   if(alldescription[i].match(req.body.searchKey)) {

        		   	  actualResult = alldescription[i]

        		   }
        	}
        

            
           
               res.render('search-results', {result: result, searchKey:req.body.searchKey, actualResult: searchTerm})
           }

           else {

          res.render('search-results', {result: result})


           }


        
})
      
})

})





server.listen(process.env.PORT || 3000, ()=> console.log("Server Running"));
