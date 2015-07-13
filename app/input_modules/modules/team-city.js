module.exports = function (app) {
  app.get('/api/team-city', function (req, res) {
    res.status(200).send('team city');
  });
};
