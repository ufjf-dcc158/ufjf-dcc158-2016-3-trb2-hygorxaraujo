const Match = require('mongoose').model('Match');
const Player = require('mongoose').model('Player');
const Elo = require('arpad');

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

function setWinDefeat(winner, loser, next) {
    var elo = new Elo();
    Player.findByIdAndUpdate(winner._id,
        {
            $inc: {wins: 1},
            eloRating: elo.newRatingIfWon(winner.eloRating, loser.eloRating)
        },
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
    Player.findByIdAndUpdate(loser._id,
        {
            $inc: {losses: 1},
            eloRating: elo.newRatingIfLost(loser.eloRating, winner.eloRating)
        },
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
}

function setDraw(playerOne, playerTwo, next) {
    var elo = new Elo();
    Player.findByIdAndUpdate(playerOne._id,
        {
            $inc: {draws: 1},
            eloRating: elo.newRatingIfTied(playerOne.eloRating, playerTwo.eloRating)
        },
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
    Player.findByIdAndUpdate(playerTwo._id,
        {
            $inc: {draws: 1},
            eloRating: elo.newRatingIfTied(playerTwo.eloRating, playerOne.eloRating)
        },
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
}

module.exports.update = function (req, res, next) {
    req.body.finished = true;
    if (req.match.playerOneId._id == req.body.winnerId) {
        req.body.loserId = req.match.playerTwoId;
        setWinDefeat(req.match.playerOneId, req.match.playerTwoId, next);
    } else if (req.match.playerTwoId._id == req.body.winnerId) {
        req.body.loserId = req.match.playerOneId;
        setWinDefeat(req.match.playerTwoId, req.match.playerOneId, next);
    } else {
        setDraw(req.match.playerOneId, req.match.playerTwoId, next);
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
    Match.findOne({"_id": id})
        .populate('playerOneId')
        .populate('playerTwoId')
        .exec(function (err, match) {
            if (err) {
                next(err);
            } else {
                req.match = match;
                next();
            }
        });
};