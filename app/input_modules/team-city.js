module.exports.initialize = function (callback, app) {
  app.get('/api/team-city', function (req, res) {
    callback('masse data');
    res.sendStatus(200);
  });
};
