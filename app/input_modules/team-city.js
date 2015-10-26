var app = require('../app').app;
var internalDataFormat = require('../module-router/config/internal-data-format');

module.exports.initialize = function (callback) {
  app.post('/api/team-city', function (req, res) {
    callback(internalDataFormat.toInternalDataFormat(req.body.status));
    res.sendStatus(200);
  });
};
