var WebSocketServer = require("ws").Server;
var app = require('express')();
var port = process.env.PORT || 5000;
var server = require("http").createServer(app);

app.get('/', function (req, res) {
  res.status(200).send('Hello!');
});

server.listen(port);

var wss = new WebSocketServer({ server: server });

wss.on('connection', function (ws) {
  console.log('client connected');

  ws.on('close', function () {
    console.log('connection closed');
  });
});
