const express = require('express'),
      morgan = require('morgan'),
      compress = require('compression'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require("path"),
      methodOverride = require('method-override'),
      shopRoutes = require('../routes/shopRoutes'),
      testRouter = require('../routes/testRouter'),
      userRoutes = require('../routes/userRoutes'); 

module.exports = function () {
    var app = express();
    app.use(express.static(path.join(__dirname, "frontend", "build")))
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    const corsOptions ={
        origin:'http://localhost:3001', 
        credentials:true,
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use(express.static("node_modules"));
    app.use('/api', shopRoutes);
    app.use('/user', userRoutes); 
    app.use('/api', testRouter); 
    

    return app;
};
