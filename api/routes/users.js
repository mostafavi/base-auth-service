const express = require('express');
const controller = require('../controllers/users');
const token = require('../utilities/token');
const config = require('../../interconnects/appconfig');

const router = express.Router();


const warp = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Login route and get pre authorized token
router.post('/signin', config.inject, warp(controller.login));
router.post('/signup', config.inject, warp(controller.signup));
router.post('/check', config.inject, warp(token.check), warp(controller.check));




module.exports = router;