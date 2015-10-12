module.exports.initialize = app =>
  app.all('*', (req, res) => res.sendStatus(404));
