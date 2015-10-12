var fs = require('fs');
var util = require('../util/util');
var mapping = require('./config/input-to-notification-map');
var loggy = require('../../git_submodules/loggy');

// Map of available notification modules
var availableNotificationModules = { };

module.exports.initialize = function () {
  loggy.info('Initializing router...');

  // Read all the input modules and initialize them
  fs.readdirSync('app/input_modules/').forEach(initializeInputModule);

  // Read all the notification modules and initialize them
  fs.readdirSync('app/notification_modules/').forEach(initializeNotificationModule);

  loggy.info('Router initialized.');
};

/*
 * #1. Gets the notification modules that is mapped to the current |inputModuleName|.
 * #2. Passes the data recieved to each notification module.
 */
function mapInputToNotification(inputModuleName, data) {
  getNotificationModulesForInputModule(inputModuleName)
    // .curry returns the 'pipeDataToNotificationModule' function with its first
    // argument prefilled to 'data'. When the .forEach calls 'pipeDataToNotificationModule',
    // it will pass the name of the notification module. The name
    // will be used as the 2nd argument to 'pipeDataToNotificationModule', since
    // the first argument is already 'data'.
    .forEach(util.curry(pipeDataToNotificationModule, data));
}

/*
 * Loads the input module, and passes the input module a callback it will use
 * when the input module recieves data.
 */
function initializeInputModule (filename) {
  var moduleName = toModuleName(filename);
  // I prefill the first argument of 'mapInputToNotification' to be |moduleName|.
  // This way, the module don't have to know its own name, and can simply just
  // pass whatever data it has recieved.
  var callback = util.curry(mapInputToNotification, moduleName);
  var module = require('../input_modules/' + moduleName);

  if (util.isFunction(module.initialize))
    module.initialize(callback);
  else
    throw 'Input module \'' + moduleName + '\' doesn\'t have the \'initialize\' function.';
}

/*
 * Loads the notification module, and puts it in the map of available
 * notification modules.
 */
function initializeNotificationModule (filename) {
  var moduleName = toModuleName(filename);
  var module = require('../notification_modules/' + moduleName);

  if(util.isFunction(module.initialize))
    module.initialize();

  availableNotificationModules[moduleName] = module;
}

/*
 * Reads which notification module an input module should pass its data to
 * from the mapping config object.
 */
function getNotificationModulesForInputModule(inputModuleName) {
  var destinationNotificationModules = mapping[inputModuleName];

  if (util.isUndefined(destinationNotificationModules))
    throw 'Input module \'' + inputModuleName + '\' isn\'t in the mapping.';

  if (!destinationNotificationModules) // Should this log a warning or blow up?
    throw 'Input module \'' + inputModuleName + '\' isn\'t mapped to any notification modules.';

  return destinationNotificationModules.split(',');
}

/*
 * Passes the data recieved to the selected notification module.
 */
function pipeDataToNotificationModule(data, notificationModuleName) {
  var notificationModule = availableNotificationModules[notificationModuleName];

  if (util.isUndefined(notificationModule))
    throw 'Notification module \'' + notificationModuleName + '\' doesn\'t exist.';

  notificationModule.pipe(data);
}

/*
 * Removes the '.js' ending from a file name.
 */
function toModuleName(filename) {
  return filename.replace('.js', '');
}
