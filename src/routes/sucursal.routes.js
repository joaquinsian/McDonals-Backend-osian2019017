'use strict'
const express = require('express');
const sucursalController = require('../controllers/sucursal.controller')
const authentication  = require('../middlewares/authenticated')

var api = express.Router();
api.post('/newbranch', authentication.ensureAuth, sucursalController.newbranch)
api.put('/editbranch/:idSucursal', authentication.ensureAuth, sucursalController.editbranch)
api.delete('/deletebranch/:idSucursal', authentication.ensureAuth, sucursalController.deletebranch)
api.get('/allbranch', authentication.ensureAuth, sucursalController.allbranch)
api.get('/onebranch/:idSucursal', authentication.ensureAuth, sucursalController.onebranch)

module.exports = api;