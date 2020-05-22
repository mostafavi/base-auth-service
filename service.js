const express = require('express');
const service = express();
const logger = require('./interconnects/logger');

const bodyParser = require("body-parser");

const usersRoute = require('./api/routes/users');

service.use((req, res, next) => {
    next();
});


// Config middlewares
service.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
service.use(bodyParser.json({ limit: '50mb' }));

service.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-Custom-Header, Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    res.header("Access-Control-Expose-Headers", "Authorization, Content-Type, Allow, X-Response-Time, Cache-Control");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Adding main routes
service.use('/users', usersRoute);


// Handling invalid routes
service.use((req, res, next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

// Handling errors
service.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = service;