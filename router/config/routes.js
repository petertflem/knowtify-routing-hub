var fs = require('fs');

module.exports.initialize = function(app) {

	// This binds up all of the api data endpoints
	fs.readdirSync('router/api').forEach(function (file) {
		require('../api/' + file.replace('.js', ''))(app);
	});

  // Handles every http request that isn't specified above
  app.all('*', function (req, res) {
    res.sendStatus(404);
  });

};
