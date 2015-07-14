var bodyParser = require('body-parser');

module.exports.initialize = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
