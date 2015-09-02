var express = require('express'),
path = require('path'),
app = express(),
port = 3000,
session = require('express-session'),
cookieParser = require('cookie-parser');

// mongodb://chatcat:chatcat@ds037283.mongolab.com:37283/goke_chatcat

// Define view files
app.set('views', path.join(__dirname, 'views'));
// Define rendering engine
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// Include Cookie Parcel Middleware
app.use(cookieParser());
app.use(session({secret : 'catscanfly'}));

require('./routes/route.js')(express, app);

app.listen(port, function(){
	console.log("ChatCAT working on " + port);
});