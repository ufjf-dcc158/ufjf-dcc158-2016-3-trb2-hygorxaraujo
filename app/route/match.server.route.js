module.exports = function (app) {
    var match = require('../controller/match.server.controller.js');
    app.route('/matches')
        .get(match.list)
        .post(match.create);
    app.route('/matches/:matchId')
        .put(match.update);
    app.param('matchId', match.matchById);
    app.get('/register-match', match.register);
};
