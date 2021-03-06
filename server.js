
var Web3 = require('web3');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var multer  = require('multer')
var mkdirp = require('mkdirp');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');

var swaggerJSDoc = require('swagger-jsdoc');

var clientCertificateAuth = require('client-certificate-auth');
var https = require('https');

var opts = {
  // Specify the key file for the server
  //key: fs.readFileSync('cert/multiauth-ca-server.key'),
  key: fs.readFileSync('cert/pack1/server.key'),
   
  // Specify the certificate file
  //cert: fs.readFileSync('cert/multiauth-ca-server.cer'),
  cert: fs.readFileSync('cert/pack1/server.crt'),
   
  // Specify the Certificate Authority certificate
  //ca: fs.readFileSync('ssl/ca/ca.crt'),
  ca: fs.readFileSync('cert/pack1/ca.crt'),
   
  // This is where the magic happens in Node.  All previous
  // steps simply setup SSL (except the CA).  By requesting
  // the client provide a certificate, we are essentially
  // authenticating the user.
  requestCert: true,

  passphrase: "abcd1234",
   
  // If specified as "true", no unauthenticated traffic
  // will make it to the route specified.
  rejectUnauthorized: true
};

var app = express();

var cors = require('cors');
app.use(cors());


var checkAuth = function(cert) {
 /*
  * allow access if certificate subject Common Name is 'Doug Prishpreed'.
  * this is one of many ways you can authorize only certain authenticated
  * certificate-holders; you might instead choose to check the certificate
  * fingerprint, or apply some sort of role-based security based on e.g. the OU
  * field of the certificate. You can also link into another layer of
  * auth or session middleware here; for instance, you might pass the subject CN
  * as a username to log the user in to your underlying authentication/session
  * management layer.
  */
  console.log('cert.subject.CN: ',cert);
  console.log('cert.subject.CN: '+cert.subject.CN);
  return cert.subject.CN === 'abc.com';
  //return true;
};

app.use(clientCertificateAuth(checkAuth));


//swagger definition
var swaggerDefinition = {
info: {
  title: 'KYC EcoSystem API',
  version: '1.0.0',
  description: 'KYC EcoSysytem RESTful API details',
},
//host: 'cotrust-api.mybluemix.net',
host: 'localhost:3005',
basePath: '/',
};

//options for the swagger docs
var options = {
// import swaggerDefinitions
swaggerDefinition: swaggerDefinition,
// path to the API docs
apis: [
'./routes/data_api/UserManagement/v1.js'],
};

//initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.set('port', process.env.PORT || 3005);
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: "15mb"}));
app.use(bodyParser.urlencoded({limit: "15mb", extended: true}));

//app.use(busboy());
app.use(cookieParser());

app.get('/swagger.json', function(req, res) {
	  res.setHeader('Content-Type', 'application/json');
	  res.send(swaggerSpec);
	});

app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());

app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.send(401);
}



app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});
setupRoutes(config.dataApiRoutes, './routes/data_api/');

function setupRoutes(routes, path, authScheme){
  
    for(var route in routes){
            if( ! routes.hasOwnProperty(route)) continue;
            var versions = routes[route];
            versions.forEach(function(version){
                 //
                 if(authScheme != null && typeof authScheme != 'undefined'){

                   
                    app.use('/' , auth.connect(authScheme), require(path + route + '/'+ version));
                 }
                 else{
                    //app.use('/' + version, require('./routes/data_api/' + route + '/'+ version));
                    app.use('/' , require(path + route + '/'+ version));
                 }
                 
            });
    
        }
}

/*
app.listen(app.get('port'), function(req,res) {
  console.log('Express server listening on port ' + app.get('port'));
});
*/

https.createServer(opts, app,function (req, res) {
  //res.writeHead(200);
  //console.log("request: " + req.connection.getPeerCertificate().subject.CN);
  //res.end("Hellod, " + req.connection.getPeerCertificate().subject.CN + "\n");
}).listen(app.get('port'), function () {
   console.log('Server listening on port ' + app.get('port'));
});


function startServer(){

}

module.exports = {
  startServer : startServer
}