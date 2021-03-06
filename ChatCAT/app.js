var express = require('express'),
	path = require('path'),
	app = express(),
	port = 3000,
	session = require('express-session'),
	config = require('./config/config.js'),
	ConnectMongo = require('connect-mongo')(session),
	mongoose = require('mongoose').connect(config.db_url),
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

// Environment
var env = process.env.NODE_ENV || "development";

if (env === "development") {
	// Dev specific settings
	app.use(session({ secret: config.session_secret, saveUnintialized: true, resave: true }));
} else {
	// Production specific settings
	// Store sessions in mongodb
	app.use(session({
		secret: config.session_secret,
		store: new ConnectMongo({
			mongoose_connection : mongoose.connections[0],
			stringify : true
		}),
		saveUnintialized: true,
		resave: true
	}));
}

// Sample code to store data in database
var userScehma = mongoose.Schema({
	username : String,
	password : String, 
	fullname : String
});

var Person = mongoose.model('users', userScehma);

var john = new Person({
	username : 'john_doe',
	password : 'john',
	fullname : 'John Doe'
});

john.save(function(err){
	console.log('Done!!!');
});

require('./routes/route.js')(express, app);

app.listen(port, function () {
	console.log("ChatCAT working on " + port);
	console.log("Mode: " + env);
});