var express = require('express');
var app = express();
var port = process.env.PORT || 5001;
var server = require("http").createServer(app);

// Initialize middleware
require('./app_config/middleware').initialize(app);

module.exports.app = app;
module.exports.httpServer = server;

// Configure the logger
require('../git_submodules/loggy').initialize({
  targetLoggingModules: [{
    name: 'httppost',
    settings: {
      http: {
        targetHostname: process.env.LOGGY_TARGET_HOSTNAME || 'localhost',
        targetPort: process.env.LOGGY_TARGET_POST || '5000',
        targetPath: process.env.LOGGY_TARGET_PATH || '/api/logs'
      }
    }
  }]
});

// Initialize module router
require('./module-router/module-router').initialize();

// Initialize global routes
require('./app_config/routes').initialize(app);

server.listen(port);
