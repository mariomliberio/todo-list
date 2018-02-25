//require the just installed express app
var express = require('express');
var todoController = require('./controllers/todocontroller');

//then we call express
var app = express();

// set up template engine

app.set('view engine', 'ejs');


// static files
app.use(express.static('./public'));

// fire controllers
todoController(app)

// listen to port
app.listen(8080);
console.log('You are listening to port 8080')