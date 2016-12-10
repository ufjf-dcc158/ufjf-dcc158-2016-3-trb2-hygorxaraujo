module.exports = function(app) {
  var index = require('../controller/index.server.controller.js');
  app.get("", index.home);
  app.get("/", index.home);
  app.get("/index", index.home);
  app.get("/index.html", index.home);
};