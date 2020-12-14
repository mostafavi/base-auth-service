const jwt = require('jsonwebtoken');
const user = require('../repositories/users');
const app = require('../../interconnects/appconfig');

exports.check = async (req, res, next) => {

    try {
        console.log(req.config);
        const token = req.headers.authorization.split(" ")[2];
        let decodeToken = await jwt.decode(token);
        let userAuth = await user.getUserAuth(req.config, decodeToken.userId);
        if (userAuth === null) {
            throw {
                code: 422,
                message: 'Invalid token!',
                ref: 'CHECK'
            }
        }
        let verification = await jwt.verify(token, userAuth.sign_key);
        //console.log(verification);
        if (!verification) {
            throw {
                code: 422,
                message: 'Invalid token!',
                ref: 'CHECK'
            }
        } else {
            res.verification = verification;
            next();
        }
    } catch (e) {
        next({
            code: 422,
            message: 'Invalid token!',
            ref: 'CHECK'
        });
    }
}