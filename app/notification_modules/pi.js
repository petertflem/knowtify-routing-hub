var httpServer = require('../app').httpServer;
var WebSocketServer = require("ws").Server;
var loggy = require('../../git_submodules/loggy');
var connections = new Map();

module.exports.initialize = function () {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    loggy.info('client connected');

    var wsId = Symbol();
    connections.set(wsId, ws);

    ws.on('close', function () {
      loggy.info('connection closed');
      connections.delete(wsId);
    });
  });
};

module.exports.pipe = function(data) {
  // Extract the needed data from the internal format
  var piDataFormat = { status: data.status };
  connections.forEach(c => c.send(JSON.stringify(piDataFormat)));
};
