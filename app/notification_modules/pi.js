var WebSocketServer = require("ws").Server;
var connections = [];

module.exports.initialize = function (httpServer) {
  var wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', function (ws) {
    console.log('client connected');

    connections.push(ws);

    ws.on('ping', function () {
      console.log('ping');
    });

    ws.on('close', function () {
      console.log('connection closed');
    });

    ws.on('message',function (data) {
      console.log('MESSAGE:' + data);
    });
  });
};

module.exports.pipe = function(data) {
  connections.forEach(function (connection) {
    connection.send(data);
  });
}
