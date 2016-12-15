const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    date: Date,
    playerOneId: {type: Schema.Types.ObjectId, ref: 'Player'},
    playerTwoId: {type: Schema.Types.ObjectId, ref: 'Player'},
    finished: {type: Boolean, default: false},
    winnerId: {type: String, default: null},
    loserId: {type: String, default: null}
});

mongoose.model('Match', MatchSchema);
