module.exports.initialize = function(app) {
  app.all('*', function (req, res) {
    res.sendStatus(404);
  });
};
