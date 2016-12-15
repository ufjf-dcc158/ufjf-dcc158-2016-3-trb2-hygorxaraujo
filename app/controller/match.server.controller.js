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

function renderAllMatches(req, res, next) {
    Match.find({})
        .populate('playerOneId')
        .populate('playerTwoId')
        .populate('winnerId')
        .populate('loserId')
        .exec(function (err, matches) {
            if (err) {
                next(err);
            } else {
                res.render('list-matches', {matches: matches});
            }
        });
}

module.exports.create = function (req, res, next) {
    var match = new Match(req.body);
    match.save(function (err) {
        if (err) {
            next(err);
        } else {
            renderAllMatches(req, res, next);
        }
    });
};

module.exports.list = function (req, res, next) {
    renderAllMatches(req, res, next);
};

module.exports.update = function (req, res, next) {
    req.body.finished = true;
    if (req.match.playerOneId == req.body.winnerId) {
        req.body.loserId = req.match.playerTwoId;
    } else if (req.match.playerTwoId == req.body.winnerId) {
        req.body.loserId = req.match.playerOneId;
    }
    Match.findByIdAndUpdate(req.match.id,
        req.body,
        function (err, match) {
            if (err) {
                next(err);
            } else {
                renderAllMatches(req, res, next);
            }
        }
    );
};

module.exports.matchById = function (req, res, next, id) {
    Match.findOne({"_id": id},
        function (err, match) {
            if (err) {
                next(err);
            } else {
                req.match = match;
                next();
            }
        }
    );
};