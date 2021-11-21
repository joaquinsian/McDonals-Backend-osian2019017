'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productoSchema  = Schema({
    empresa: {type: Schema.Types.ObjectId, ref: 'empresa'},
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    sucursal: {type: Schema.Types.ObjectId, ref: 'sucursal'},
    nombreProducto: String,
    nombreProveedor: String,
    stock: Number,
    vendido: Number
})

module.exports = mongoose.model('producto', productoSchema) 
