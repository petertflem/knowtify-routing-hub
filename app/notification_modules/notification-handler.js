var fs = require('fs');

module.exports.initializeModules = function (httpServer) {

  // This initializes all the input modules
	fs.readdirSync('app/notification_modules/modules').forEach(function (file) {
		require('./modules/' + file.replace('.js', ''))(httpServer);
	});

};
