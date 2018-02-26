var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
//connect to server
mongoose.connect('mongodb://127.0.0.1/use', function(err, db) {
  if (err) {
      console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
      console.log('Connected to Server successfully!');
  }
});

//create schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//actual app controller

module.exports = function(app){
    app.get('/todo', function(req, res){
      // get data from mongodb + pass it to view
      Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos:data});
      });
      
    });
    app.post('/todo', urlencodedParser, function(req, res){
      //get data from the view and add it to mongodb
      var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
      });
    });
    app.delete('/todo/:item', function(req, res){
      Todo.find({item: req.params.item.replace(/\-/, "")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
  });
});
}