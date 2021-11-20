'use strict'
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../service/jwt");

//Función para logear
async function login(req, res) {
  var params = req.body; 
  await Usuario.findOne({ user: params.user }, (err, usuarioVisto) => {
      if (err) {
          return res.status(500).send({ mensaje: "Error en la petición" })
      } else if (usuarioVisto) {
          bcrypt.compare(params.password, usuarioVisto.password, (err, passCorrect) => {
              if (passCorrect) {
                  if (params.getToken === true) {
                      return res.status(200).send({ token: jwt.createToken(usuarioVisto) })
                  } else {
                      usuarioVisto.password = undefined;
                      return res.status(200).send({ usuarioVisto })
                  }
              } else {
                  return res.status(500).send({ mensaje: "La contraseña no coincide" })
              }
          })
      } else {
          return res.status(500).send({ mensaje: "El usuario no existe" })
      }
  })
}

module.exports = {
  login
}