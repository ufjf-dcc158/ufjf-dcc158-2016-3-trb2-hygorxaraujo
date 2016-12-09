const config = require('./config');

const mongoose = require('mongoose');
module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/model/player.server.model.js');
  require('../app/model/match.server.model.js');
  return db;
};
