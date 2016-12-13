const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    date: Date,
    playerOneId: String,
    playerTwoId: String,
    finished: {type: Boolean, default: false},
    winnerId: {type: String, default: null},
    loserId: {type: String, default: null}
});

mongoose.model('Match', MatchSchema);
