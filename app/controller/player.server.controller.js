const Player = require('mongoose').model('Player');

module.exports.register = function (req, res, next) {
    res.render('register-player');
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
            res.render('list-players', {players: players});
        }
    });
};

module.exports.playerById = function (req, res, next, id) {
    Player.findOne({"_id": id},
        function (err, player) {
            if (err) {
                next(err);
            } else {
                req.player = player;
                next();
            }
        });
};

module.exports.read = function (req, res, next) {
    res.json(req.player);
};