var fs = require('fs');
var util = require('../util/util');
var mapping = require('./config/input-to-notification-map');

// Map of available notification modules
var availableNotificationModules = { };

module.exports.initialize = function (app, httpServer) {

  // Initialize input modules and notification modules
  initializeInputModules(app);
  initializeNotificationModules(httpServer);

};

function mapInputToNotification(moduleName, data) {
  var destinationNotificationModules = mapping[moduleName];
  destinationNotificationModules.split(',').forEach(function (module) {
    availableNotificationModules[module].pipe(data);
  });
}

function initializeInputModules (app) {
  fs.readdirSync('app/input_modules/').forEach(function (file) {
    var moduleName = file.replace('.js', '');
    var callback = util.curry(mapInputToNotification, moduleName);

    require('../input_modules/' + moduleName).initialize(callback, app);
  });
}

function initializeNotificationModules (httpServer) {
  fs.readdirSync('app/notification_modules/').forEach(function (file) {
    var moduleName = file.replace('.js', '');

    var module = require('../notification_modules/' + moduleName);
    module.initialize(httpServer);

    availableNotificationModules[moduleName] = module;
  });
}
