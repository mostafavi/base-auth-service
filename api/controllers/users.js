const db = require('../utilities/Database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('../utilities/jwt');
const repo = require('../repositories/users');
const app = require('../../interconnects/appconfig');
const { Validator } = require('node-input-validator');
const logger = require('../../interconnects/logger');
const Protocol = require('../utilities/Protocol');

exports.login = async (req, res, next) => {
    let config = app.getAppConfig(req.header('appKey'));

    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    const matched = await v.check();
    if (!matched) {
        next({
            code: 422,
            message: v.errors,
            ref: 'INPUTS-VALIDATION'
        });
    } else {
        try {
            const entity = await repo.getUserEntry(req.config, req.body.email);
            if (entity === null) {
                throw {
                    code: 400,
                    message: 'Authentication error!',
                    ref: 'SIGNIN'
                }
            }
            const auth = await repo.getUserAuth(req.config, entity.user_id);
            const match = await bcrypt.compare(req.body.password, auth.user_password);

            if (match) {
                let token = jwt.sign(auth.sign_key, { userId: entity.user_id });
                res.status(200).json(Protocol.encaps('DATA', 200,
                    {
                        status: 'OK',
                        data: token,
                        ref: 'SIGNIN'
                    }).messageFrame);
            } else {
                throw {
                    code: 400,
                    message: 'Authentication error!',
                    ref: 'SIGNIN'
                }
            }
        } catch (e) {
            logger.log(e);
            next(e);
        }
    }
}

exports.signup = async (req, res, next) => {
    let config = app.getAppConfig(req.header('appKey'));
    const v = new Validator(req.body, {
        email: 'required|email',
        username: 'required|minLength:3|maxLength:15|string',
        password: 'required|minLength:8'
    });

    const matched = await v.check();

    if (!matched) {
        next({
            code: 422,
            message: v.errors,
            ref: 'INPUTS-VALIDATION'
        });

    } else {
        try {
            let entity = await repo.checkEmailExist(req.config, req.body.email);
            if (entity != null) {
                throw {
                    code: 422,
                    message: 'email already exist!',
                    ref: 'REGISTERATION'
                };
            }
            let auth = await repo.checkUsernameExist(req.config, req.body.username);
            if (auth != null) {
                throw {
                    code: 422,
                    message: 'username already exist!',
                    ref: 'REGISTERATION'
                }
            }

            const signiture = crypto.randomBytes(64).toString('base64').slice(0, 64);
            const saltRounds = 10;

            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(req.body.password, salt);
            let addEntity = await repo.addUserEntity(req.config, { username: req.body.username, email: req.body.email })
            let addAuth = await repo.addAuthEntity(req.config, { userId: addEntity, salt: salt, password: hash, key: signiture })
            res.status(200).json(Protocol.encaps('CTL', 200,
                {
                    status: 'OK',
                    info: { userId: addEntity },
                    ref: 'CHECK'
                }).messageFrame);
        } catch (e) {
            next(e);
        }
    }
}
exports.check = (req, res, next) => {
    res.status(200).json(Protocol.encaps('CTL', 200,
        {
            status: 'OK',
            info: res.verification,
            ref: 'CHECK'
        }).messageFrame);
}