var express = require('express'),
app = express(),
port = 3000;

// Create Routes
app.route('/').get(function(req, res, next){
	res.send('<h1>Hello World</h1>');	
});

app.listen(port, function(){
	console.log("ChatCAT working on " + port);
});