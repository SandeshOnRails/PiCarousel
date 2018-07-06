const express = require ('express');

const path = require('path');

const app = express();


// add ejs templating engine. remove html engine


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
