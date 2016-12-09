const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  date: Date,
  player1: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
  player2: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
});

mongoose.model('Match', MatchSchema);
