var app = GLOBAL.app;

module.exports.initialize = function (callback) {
  app.post('/api/dummy', function (req, res) {
    callback(req.body);
    res.sendStatus(200);
  });
};
