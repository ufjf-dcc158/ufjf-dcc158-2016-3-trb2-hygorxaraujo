module.exports = function(app) {
  var player = require('../controller/player.server.controller.js');
    app.route('/players')
        .get(player.list)
        .post(player.create);
    app.param('playerId', player.playerById);
    app.route('/players/:playerId')
        .get(player.read);
    app.get("/register-player", player.register);
};
