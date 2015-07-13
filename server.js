var express = require('express');
var http = require('http');
var socket = require('./socket.js')
var app = express();
var debug = require('debug')('src:server')
var mongoose = require('mongoose');
var todo = require('./model/todo.js');
var bodyparser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var port = 5000;

/* app configuration */
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var server = http.createServer(app);
var io = require('socket.io')(server);

/* routing */
app.get('/', function(req, res) {
	//res.send("Hello World");
	res.sendFile("index.html")
});

app.get('/database', function(req, res, next) {
	todo.find(function(err, todos) {
		if (err) return next(err);
		res.json(todos);
	})
});

app.post('/database', function(req, res, next) {
	console.log("BODY!!!!!!" + req.body);
	todo.create(req.body, function(err, post) {
		console.log(post)
		if (err) return next(err);
		res.json(post);
	})
});

/* socket io */
// io.on('connection', function(socket){
//   console.log('A new connection')
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//     console.log(msg)
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

mongoose.connect('mongodb://localhost/database', function(err) {
	if (err) {
		console.log(err);
		debug('mongodb connection error', err);
	} else {
		debug('mongodb connection successful');
	}
});



io.on('connection', socket)


server.listen(port, function(){
	console.log("APP listen at port" + port);
});

