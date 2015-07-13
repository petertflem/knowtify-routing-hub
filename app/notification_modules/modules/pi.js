var WebSocketServer = require("ws").Server;

module.exports = function (httpServer) {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    console.log('client connected');

    ws.on('close', function () {
      console.log('connection closed');
    });
  });
};
