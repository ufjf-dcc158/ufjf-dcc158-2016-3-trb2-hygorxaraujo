const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    firstname: String,
    lastname: String,
    birthday: Date,
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    draws: {type: Number, default: 0},
    eloRating: {type: Number, default: 1500}
});

mongoose.model('Player', PlayerSchema);
