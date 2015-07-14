module.exports.initialize = function (callback, app) {
  app.get('/api/team-city', function (req, res) {
    callback('masse data');
    console.log('Team City hit!!');
    res.sendStatus(200);
  });
};
