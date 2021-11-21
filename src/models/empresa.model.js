'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var empresaSchema  = Schema({
    user: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('empresa', empresaSchema) 