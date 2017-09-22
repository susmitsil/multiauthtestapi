
var https = require('https');
var fs = require("fs");

var options = {
	host: 'localhost',
	port: 3005,
	path: '/greetUser/UserA',
	method: 'GET',
	key: fs.readFileSync("cert/pack1/userA.key"),
	cert: fs.readFileSync("cert/pack1/userA.crt"),
	ca: fs.readFileSync("cert/pack1/ca.crt")
};

var options2 = {
	host: 'localhost',
	port: 3005,
	path: '/greetUser/UserB',
	method: 'GET',
	key: fs.readFileSync("cert/pack1/userB.key"),
	cert: fs.readFileSync("cert/pack1/userB.crt"),
	ca: fs.readFileSync("cert/pack1/ca.crt")
};

var options3 = {
	host: 'localhost',
	port: 3005,
	path: '/greetUser/UserC',
	method: 'GET',
	key: fs.readFileSync("cert/pack1/userB.key"),
	cert: fs.readFileSync("cert/pack1/userB.crt"),
	ca: fs.readFileSync("cert/pack1/ca.crt")
};

var req = https.request(options3, function(res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);

	console.log(res.connection.getPeerCertificate().subject.CN);
	
	res.on('data', function(d) {
    	process.stdout.write(d);
  	});
});

req.end();

req.on('error', function(e) {
	console.error(e);
});