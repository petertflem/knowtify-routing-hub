module.exports.curry = function (fn) {
  var args =  [].slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  }
};
