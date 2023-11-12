const express = require('express'),
      morgan = require('morgan'),
      compress = require('compression'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      shopRoutes = require('../routes/shopRoutes'),
      userRoutes = require('../routes/userRoutes'); 

module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use('/api', shopRoutes);
    app.use('/users', userRoutes); 

    app.use(express.static("./node_modules"));

    return app;
};
