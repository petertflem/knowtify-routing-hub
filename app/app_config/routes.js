module.exports.initialize = function(app) {
  app.all('*', (req, res) => res.sendStatus(404));
};
