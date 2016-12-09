module.exports = function(app) {
  var player = require('../controller/player.server.controller.js');
  app.route('/player')
        //.get(player.list)
        .post(player.create);
  //app.route('/player/:playerId')
        //.get(player.read)
        //.put(player.update);
  //app.param('playerId', player.playerById);
  app.get("/cadastrar-jogador", player.register);
};
