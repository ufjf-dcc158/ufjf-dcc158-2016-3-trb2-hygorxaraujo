const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  date: Date,
    playerOneId: String,
    playerTwoId: String
});

mongoose.model('Match', MatchSchema);
