var WebSocketServer = require("ws").Server;
var webSocket = {};

module.exports.initialize = function (httpServer) {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    console.log('client connected');

    webSocket = ws;

    ws.on('close', function () {
      console.log('connection closed');
    });
  });
};

module.exports.pipe = function(data) {
  webSocket.send(data);
}
