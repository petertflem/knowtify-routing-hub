var fs = require('fs');
var util = require('../util/util');
var mapping = require('./config/input-to-notification-map');

// Map of available notification modules
var availableNotificationModules = { };

module.exports.initialize = function () {
  fs.readdirSync('app/input_modules/').forEach(initializeInputModule);
  fs.readdirSync('app/notification_modules/').forEach(initializeNotificationModule);
};

function mapInputToNotification(inputModuleName, data) {
  getNotificationModulesForInputModule(inputModuleName)
    .forEach(util.curry(pipeDataToNotificationModule, data));
}

function initializeInputModule (filename) {
  var moduleName = toModuleName(filename);
  var callback = util.curry(mapInputToNotification, moduleName);
  var module = require('../input_modules/' + moduleName);

  if (util.isFunction(module.initialize))
    module.initialize(callback);
  else
    throw 'Input module \'' + moduleName + '\' doesn\'t have the \'initialize\' function.';
}

function initializeNotificationModule (filename) {
  var moduleName = toModuleName(filename);
  var module = require('../notification_modules/' + moduleName);

  if(util.isFunction(module.initialize))
    module.initialize();
  else
    throw 'Notification module \'' + moduleName + '\' doesn\'t have the \'initialize\' function.';

  availableNotificationModules[moduleName] = module;
}

function getNotificationModulesForInputModule(inputModuleName) {
  var destinationNotificationModules = mapping[inputModuleName];

  if (util.isUndefined(destinationNotificationModules))
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

function toModuleName(filename) {
  return filename.replace('.js', '');
}
