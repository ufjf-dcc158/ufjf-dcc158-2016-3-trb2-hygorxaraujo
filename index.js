process.env.NODE_ENV = process.env.NODE_ENV || 'devel';

const mongoose = require('./config/mongoose');
const express = require('./config/express');
var db = mongoose();
var app = express();

var port = process.env.PORT || 3000;
console.log("Ouvindo conexões na porta " + port);
app.listen(port);

module.exports = app;
