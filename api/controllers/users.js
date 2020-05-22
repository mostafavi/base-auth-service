//const users = require('../repositories/logs');
const db = require('../utilities/Database');
const bcrypt = require('bcrypt');
const repo = require('../repositories/users');
const app = require('../../interconnects/appconfig');

exports.login = (req, res, next) => {
    let config = app.getAppConfig(req.header('appKey'));
    console.log(config);
    repo.getUserEntry(config, req.body.email).then((result) => {
        res.status(200).json(result);
    })
}