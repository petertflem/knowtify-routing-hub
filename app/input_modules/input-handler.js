var fs = require('fs');

module.exports.initializeModules = function (app) {

  // This initializes all the input modules
	fs.readdirSync('app/inputs/modules').forEach(function (file) {
		require('./modules/' + file.replace('.js', ''))(app);
	});

};
