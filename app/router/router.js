var fs = require('fs');
var mapping = require('./config/mapping');

// Map of available notification modules
var notificationModules = { };

module.exports.initialize = function (app, httpServer) {

  // Initialize input modules and notification modules
  initializeInputModules(app);
  initializeNotificationModules(httpServer);

};

function mapInputToNotification(moduleName, data) {
  var destinationModules = mapping[moduleName];
  destinationModules.split(',').forEach(function (module) {
    notificationModules[module].pipe(data);
  });
}

function initializeInputModules (app) {
  fs.readdirSync('app/input_modules/').forEach(function (file) {
    var moduleName = file.replace('.js', '');
    var callback = curry(mapInputToNotification, moduleName);

    require('../input_modules/' + moduleName).initialize(callback, app);
  });
}

function initializeNotificationModules (httpServer) {
  fs.readdirSync('app/notification_modules/').forEach(function (file) {
    var moduleName = file.replace('.js', '');

    var module = require('../notification_modules/' + moduleName);
    module.initialize(httpServer);

    notificationModules[moduleName] = module;
  });
}

function curry (fn) {
  var args =  [].slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  }
}
