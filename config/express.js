const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./config');
const ejs = require('ejs');

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV == 'devel') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV == 'prod') {
        app.use(compression());
    }
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static('./public'));
    app.set('views', './app/view');
    app.set('view engine', 'ejs');
    require('../app/route/index.server.route.js')(app);
    require('../app/route/player.server.route.js')(app);
    require('../app/route/match.server.route.js')(app);
    return app;
};
