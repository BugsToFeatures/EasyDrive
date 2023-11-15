const express = require('express'),
      morgan = require('morgan'),
      compress = require('compression'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      shopRoutes = require('../routes/shopRoutes'),
      testRouter = require('../routes/testRouter'),
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

    app.use(express.static("node_modules"));
    app.use('/', shopRoutes);
    app.use('/users', userRoutes); 
    app.use('/', testRouter); 
    

    return app;
};
