var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var server = require("http").createServer(app);

// Initialize input handling modules
require('./inputs/input-handler').initializeModules(app);

// Initialize routing module

// Initialize the notification modules
require('./notification_modules/notifications-handler').initializeModules(server);

// Initialize global routes
require('./config/routes.js').initialize(app);

server.listen(port);
