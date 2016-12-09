module.exports = function(app) {
  var match = require('../controller/match.server.controller.js');
  app.route('/match')
        .get(match.list)
        .post(match.create);
  app.get('/agendar-partida', match.register);
};
