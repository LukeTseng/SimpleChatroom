var express = require('express');
var http = require('http');
var socket = require('./socket.js')
var app = express();

var port = 5000;

/* app configuration */
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
var io = require('socket.io')(server);

/* routing */
app.get('/', function(req, res) {
	//res.send("Hello World");
	res.sendFile("index.html")
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

io.on('connection', socket)


server.listen(port, function(){
	console.log("APP listen at port" + port);
});

