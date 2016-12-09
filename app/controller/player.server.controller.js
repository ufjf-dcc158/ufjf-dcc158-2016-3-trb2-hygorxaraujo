const Player = require('mongoose').model('Player');

module.exports.register = function(req, res, next) {
  res.render('register-player');
};

module.exports.create = function(req, res, next) {
  var player = new Player(req.body);
  player.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(player);
    }
  });
};
