'use strict'
const express = require('express');
const empresaController = require('../controllers/empresa.controller')
const authentication  = require('../middlewares/authenticated')

var api = express.Router(); 
api.post('/login', empresaController.login)
api.post('/productsucursal', authentication.ensureAuth, empresaController.productsucursal)

module.exports = api;
