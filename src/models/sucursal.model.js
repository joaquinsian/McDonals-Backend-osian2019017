'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var sucursalSchema  = Schema({
    empresa: {type: Schema.Types.ObjectId, ref: 'empresa'},
    user: String,
    password: String,
    rol: String,
    nombreSucursal: String,
    direccionSucursal: String
})

module.exports = mongoose.model('sucursal', sucursalSchema) 
