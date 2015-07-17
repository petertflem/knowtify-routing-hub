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

function mapInputToNotification(inputModuleName, data) {
  try {
    getNotificationModules(inputModuleName)
      .forEach(curry(pipeDataToNotificationModule, data));
  } catch (e) {
    console.error(e);
  }
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

function getNotificationModules(inputModuleName) {
  var destinationNotificationModules = mapping[inputModuleName];

  if (util.isUndefined(estinationNotificationModules))
    throw 'Input module \'' + inputModuleName + '\' isn\'t in the mapping.';

  if (!destinationNotificationModules) // Should this log a warning or blow up?
    throw 'Input module \'' + inputModuleName + '\' isn\'t mapped to any notification modules.';

  return destinationNotificationModules.split(',');
}

function pipeDataToNotificationModule(data, notificationModuleName) {
  var notificationModule = availableNotificationModules[notificationModuleName];

  if (util.isUndefined(notificationModule))
    throw 'Notification module \'' + notificationModuleName + '\' doesn\'t exist.';

  notificationModule.pipe(data);
}
