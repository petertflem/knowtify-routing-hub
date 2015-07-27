/* Look into ws restore */

var httpServer = GLOBAL.httpServer;
var WebSocketServer = require("ws").Server;
var util = require('../util/util');
var loggy = require('../../git_submodules/loggy');

var connections = { };
var connectionIdCounter = 0;

module.exports.initialize = function () {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    loggy.info('client connected');

    var wsId = connectionIdCounter++;
    connections[wsId] = ws;

    ws.on('close', function () {
      loggy.info('connection closed');
      delete connections[wsId];
    });
  });
};

module.exports.pipe = function(data) {
  util.loopObejctProperties(connections, function (connection) {
    connection.send(JSON.stringify(data));
  });
}
