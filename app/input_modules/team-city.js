var app = GLOBAL.app;

module.exports.initialize = function (callback) {
  app.post('/api/team-city', function (req, res) {
    callback('masse data');
    console.log('========Team City hit!!===========');
    console.log(req.body);
    console.log('==================================');
    res.sendStatus(200);
  });
};
