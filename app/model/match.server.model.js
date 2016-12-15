const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    date: Date,
    playerOneId: {type: Schema.Types.ObjectId, ref: 'Player'},
    playerTwoId: {type: Schema.Types.ObjectId, ref: 'Player'},
    finished: {type: Boolean, default: false},
    draw: {type: Boolean, default: false},
    winnerId: {type: Schema.Types.ObjectId, ref: 'Player'},
    loserId: {type: Schema.Types.ObjectId, ref: 'Player'}
});

mongoose.model('Match', MatchSchema);
