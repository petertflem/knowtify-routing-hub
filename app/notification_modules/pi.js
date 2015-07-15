/* Look into ws restore */

var WebSocketServer = require("ws").Server;
var util = require('../util/util');

var connections = { };
var connectionIdCounter = 0;

module.exports.initialize = function (httpServer) {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    console.log('client connected');

    var wsId = connectionIdCounter++;
    connections[wsId] = ws;

    ws.on('close', function () {
      console.log('connection closed');
      delete connections[wsId];
    });
  });
};

module.exports.pipe = function(data) {
  util.loopObejctProperties(connections, function (connection) {
    connection.send(data);
  });
}
