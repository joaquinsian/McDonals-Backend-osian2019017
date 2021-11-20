'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var empresaSchema  = Schema({
    empresa: {type: Schema.Types.ObjectId, ref: 'empresa'},
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    sucursal: {type: Schema.Types.ObjectId, ref: 'sucursal'}
})

module.exports = mongoose.model('empresa', empresaSchema) 