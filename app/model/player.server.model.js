const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  firstname: String,
  lastname: String,
  birthday: Date
});

mongoose.model('Player', PlayerSchema);
