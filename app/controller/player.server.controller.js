const Player = require('mongoose').model('Player');

module.exports.register = function (req, res, next) {
    res.render('register-playerOne');
};

module.exports.create = function (req, res, next) {
    var player = new Player(req.body);
    player.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(player);
        }
    });
};

module.exports.list = function (req, res, next) {
    Player.find({}, function (err, players) {
        if (err) {
            next(err);
        } else {
            res.json(players);
        }
    });
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;