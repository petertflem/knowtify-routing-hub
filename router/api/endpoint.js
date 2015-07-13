module.exports = function (app) {

  /*
   * GET: /test
   */
  app.get('/test', function (req, res) {
    res.status(200).send('test');
  });
}
