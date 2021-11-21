'use strict'
const express = require('express');
const productoController  = require('../controllers/producto.controller')
const authentication  = require('../middlewares/authenticated')

var api = express.Router();
api.post('/newproducto', authentication.ensureAuth, productoController.newproducto)
api.put('/editproducto/:idProducto', authentication.ensureAuth, productoController.editproducto)
api.delete('/deleteproducto/:idProducto', authentication.ensureAuth, productoController.deleteproducto)
api.get('/allproductos', authentication.ensureAuth, productoController.allproductos)
api.put('/enviarvender/:idProducto', authentication.ensureAuth, productoController.enviarvender)
api.get('/oneproducto/:idProducto', authentication.ensureAuth, productoController.oneproducto)

module.exports = api;