module.exports.curry = function (fn) {
  var args =  [].slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  }
};

module.exports.isUndefined = function (obj) {
  return typeof obj === 'undefined';
};

module.exports.isFunction = function (obj) {
  return typeof obj === 'function';
};
