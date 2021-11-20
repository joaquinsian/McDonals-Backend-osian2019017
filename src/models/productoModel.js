'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productoSchema  = Schema({
    sucursal: {type: Schema.Types.ObjectId, ref: 'sucursal'},
    nombreProducto: String,
    nombreProveedor: String,
    Stock: String
})

module.exports = mongoose.model('producto', productoSchema) 
