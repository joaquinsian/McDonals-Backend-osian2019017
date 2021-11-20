"use strict"
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcrypt-nodejs");

//crear admin por default 

async function adminDefault(user, password) {
  var usuarioModel = new Usuario();
  if (user && password) {
    usuarioModel.user = user;
    usuarioModel.password = password;
    usuarioModel.rol = "Admin";
    //usuarioModel.rol = rol;

    await Usuario.find({ $or: [{ user: usuarioModel.user }] }).exec(
      (err, adminEncontrado) => {
        if (err) {
          console.log("Error en la petición");
        } else if (adminEncontrado && adminEncontrado.length >= 1) {
          console.log("el administrador ya ha sido creado");
        } else {
          bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt) => {
            usuarioModel.password = passEncrypt;
            usuarioModel.save((err, adminGuardado) => {
              if (err) {
                console.log("Error en la petición al guardar el administrador");
              } else if (!adminGuardado) {
                console.log("No se pudo almacenar el administrador");
              } else {
                console.log("administrador creado", adminGuardado);
              }
            });
          });
        }
      }
    );
  } else {
    return res
      .status(500)
      .send({ mensaje: "no ha ingresado todos los parametros" });
  }
}
module.exports = {
  adminDefault,
};
