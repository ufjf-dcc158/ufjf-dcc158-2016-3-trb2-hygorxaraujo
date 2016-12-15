const Match = require('mongoose').model('Match');
const Player = require('mongoose').model('Player');

module.exports.register = function (req, res, next) {
    Player.find({}, function (err, players) {
        if (err) {
            next(err);
        } else {
            res.render('register-match', {players: players});
        }
    });
};

module.exports.create = function (req, res, next) {
    var match = new Match(req.body);
    match.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(match);
        }
    });
};

module.exports.list = function (req, res, next) {
    Match.find({})
        .populate('playerOneId')
        .populate('playerTwoId')
        .exec(function (err, matches) {
            if (err) {
                next(err);
            } else {
                res.json(matches);
            }
        });
};
