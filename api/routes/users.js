const express = require('express');
const usersController = require('../controllers/users');


const router = express.Router();

// Login route and get pre authorized token
router.post('/login', usersController.login);


module.exports = router;