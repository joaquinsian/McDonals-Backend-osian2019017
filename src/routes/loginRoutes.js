'use strict'
const express = require('express');
const loginController = require('../controllers/loginControllers');

var api = express.Router(); 
api.post('/Login', loginController.login)

module.exports = api;
