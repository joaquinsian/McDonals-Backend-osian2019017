'use strict'
const Empresa = require("../models/empresa.model");
const Sucursal = require('../models/sucursal.model');
const Producto = require('../models/producto.model');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../service/jwt");
 
//Función para logear
function login(req, res) {
    var params = req.body;

    Empresa.findOne({user: params.user}, (err, obtainedUser)=>{
        if (err) return res.status(500).send({mesaje:"Error en la petición"});
        if(obtainedUser){
            bcrypt.compare(params.password, obtainedUser.password,(err,correctPass)=>{
                if(correctPass){
                    if(params.getToken === "true"){
                        return res.status(200).send({token: jwt.createToken(obtainedUser)});
                    } else{
                        obtainedUser.password=undefined;
                        return res.status(200).send({ obtainedUser });
                    }
                }else{
                    return res.status(404).send({mesaje: "El usuario no se ha podido identificar"})
                }
            })
        }else{
            Sucursal.findOne({user: params.user}, (err, sucursal)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"});
                if(sucursal){
                    bcrypt.compare(params.password, sucursal.password,(err,correctPass)=>{
                        if(correctPass){
                            if(params.getToken === "true"){
                                return res.status(200).send({token: jwt.createToken(sucursal)});
                            } else{
                                sucursal.password=undefined;
                                return res.status(200).send({ sucursal });
                            }
                        }else{
                            return res.status(404).send({mesaje: "El usuario no se ha podido identificar"})
                        }
                    })
                }else{
                    return res.status(500).send({mesaje: "El usuario no ha podido ingresar"})
                }
            })
        }
    })
}

//Agregar producto a una sucursal
function newproducto(req, res) {
    var productoModel = Producto();
    var params = req.body;

    if(req.user.rol === 'admin'){
        //producto de la empresa
        productoModel.producto = params.producto
        productoModel.sucursal = params.sucursal
        productoModel.stock = 0
        productoModel.vendido = 0
        productoModel.save((err, producto) => {
            if (err) return res.status(500).send({mesaje: err})
            if (producto) return res.status(500).send({producto})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

module.exports = {
  login,
  newproducto
}