//const users = require('../repositories/logs');
const db = require('../utilities/Database');
const bcrypt = require('bcrypt');
const repo = require('../repositories/users');
const app = require('../../interconnects/appconfig');
const { Validator } = require('node-input-validator');

exports.login = async (req, res, next) => {
    let config = app.getAppConfig(req.header('appKey'));
    console.log(config);
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    const matched = await v.check();

    if (!matched) {
        res.status(422).json(v.errors);
    } else {
        const entity = await repo.getUserEntry(config, req.body.email).catch(e => res.status(400).json(e));
        const result = await repo.getUserAuth(config, entity.user_id);
        res.status(200).json(result);
    }


}
exports.signup = (req, res, next) => {

}