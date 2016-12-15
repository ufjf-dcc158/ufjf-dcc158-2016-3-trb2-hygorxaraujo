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

function setWinDefeat(winnerId, loserId, next) {
    Player.findByIdAndUpdate(winnerId,
        {$inc: {wins: 1}},
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
    Player.findByIdAndUpdate(loserId,
        {$inc: {losses: 1}},
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
}

function setDraw(winnerId, loserId, next) {
    Player.findByIdAndUpdate(winnerId,
        {$inc: {draws: 1}},
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
    Player.findByIdAndUpdate(loserId,
        {$inc: {draws: 1}},
        function (err, player) {
            if (err) {
                next(err);
            }
        }
    );
}

module.exports.update = function (req, res, next) {
    req.body.finished = true;
    if (req.match.playerOneId == req.body.winnerId) {
        req.body.loserId = req.match.playerTwoId;
        setWinDefeat(req.match.playerOneId, req.match.playerTwoId, next);
    } else if (req.match.playerTwoId == req.body.winnerId) {
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