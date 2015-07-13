var fs = require('fs');

module.exports.initialize = function(app) {

	// Handles every http request that isn't specified above
  app.all('*', function (req, res) {
    res.sendStatus(404);
  });

};
