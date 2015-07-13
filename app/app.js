var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var server = require("http").createServer(app);

// Initialize routing module
require('./router/router').initialize(app, server);

// Initialize global routes
require('./config/routes.js').initialize(app);

server.listen(port);
