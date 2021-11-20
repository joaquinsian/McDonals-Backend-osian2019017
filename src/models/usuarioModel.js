'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuarioSchema  = Schema({
    user: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('usuario', usuarioSchema);