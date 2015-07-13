var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var server = require("http").createServer(app);

require('./config/routes').initialize(app);
require('./config/web-socket').initialize(server);

server.listen(port);
