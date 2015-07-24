var express = require('express');
var app = express();
var port = process.env.PORT || 5001;
var server = require("http").createServer(app);

// Initialize middleware
require('./app_config/middleware').initialize(app);

// Fix this
GLOBAL.app = app;
GLOBAL.httpServer = server;

module.exports.app = app;
module.exports.httpServer = httpServer;

// Configure the logger
require('../git_submodules/loggy').initialize({
  targetLoggingModules: [{ name: 'httppost' }]
});

// Initialize module router
require('./module-router/module-router').initialize();

// Initialize global routes
require('./app_config/routes').initialize(app);

server.listen(port);
