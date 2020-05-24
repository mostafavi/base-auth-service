const express = require('express');
const service = express();
const logger = require('./interconnects/logger');

const bodyParser = require("body-parser");

const usersRoute = require('./api/routes/users');

const protocol = require('./api/utilities/protocol');



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
    console.log(error);
    if (error.ref != null) {
        res.status(error.code || 500);
        let message = protocol.encaps('ERR', error.code, { message: error.message, info: error.info, ref: error.ref })
        res.json(message.messageFrame);
    } else {
        res.status(500);
        let message = protocol.encaps('ERR', 500, { message: 'Internal error!', info: 'unknown', ref: 'SYSTEM' })
        res.json(message.messageFrame);
    }
});

module.exports = service;