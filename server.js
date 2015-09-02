var http = require('http'),
	host = '127.0.0.1',
	fs = require('fs'),
	path = require('path'),
	port = '9000';

// Create a dictionary of mime types
var mimes = {
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".gif": "image/gif",
	".jpg": "image/jpeg",
	".png": "image/png"
};

var server = http.createServer(function (req, res) {
	var filePath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
	var contentType = mimes[path.extname(filePath)];

	// Get the real path of the file 
	var realPath = path.join(__dirname, filePath);
	
	// Check to see if the file exists
	fs.exists(realPath, function (exists) {
		if (exists) {
			// Stream file
			res.writeHead(200, { 'Content-Type': contentType });
			var streamFile = fs.createReadStream(realPath).pipe(res);
			
			streamFile.on('error', function(){
				res.writeHead(500);
				res.end();
			});
		} else {
			res.writeHead(404);
			res.end('Sorry we could not find the file you requested !');
		}
	});
}).listen(port, host, function () {
	console.log("Server Running on http://" + host + ":" + port);
});


