var express = require('express'),
path = require('path'),
app = express(),
port = 3000;

// Define view files
app.set('views', path.join(__dirname, 'views'));
// Define rendering engine
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/route.js')(express, app);

app.listen(port, function(){
	console.log("ChatCAT working on " + port);
});