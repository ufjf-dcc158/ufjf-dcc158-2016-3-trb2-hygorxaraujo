const Match = require('mongoose').model('Match');

module.exports.register = function(req, res, next) {
  res.render('register-match');
};

module.exports.create = function(req, res, next) {
  var match = new Match(req.body);
  match.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(match);
    }
  });
};

module.exports.list = function(req, res, next) {
  Match.find({}, function(err, matches) {
    if (err) {
      next(err);
    } else {
      res.json(matches);
    }
  });
};
