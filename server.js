var express = require('express');
var app = express();
var io = require('socket.io').listen.(app);
var port = 5000;

app.use(express.static(__dirname + '/public'));


/* routing */
app.get('/', function(req, res) {
	//res.send("Hello World");
	res.sendFile("index.html")
});




app.listen(port);
console.log("App listen at port " + port)

