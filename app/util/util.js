module.exports.curry = function (fn) {
  var args =  [].slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  }
};

module.exports.loopObejctProperties = function(obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj[key]);
    }
  }
}
