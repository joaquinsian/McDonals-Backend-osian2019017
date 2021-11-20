'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var sucursalSchema  = Schema({
    empresa: {type: Schema.Types.ObjectId, ref: 'empresa'},
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    nombreSucursal: String,
    direccionSucursal: String
})

module.exports = mongoose.model('sucursal', sucursalSchema) 
