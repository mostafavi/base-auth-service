const jwt = require('jsonwebtoken');

exports.sign = (signKey, data) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        userId: data.userId
    }, signKey);
}