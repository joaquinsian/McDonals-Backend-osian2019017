'use strict'
const Sucursal = require('../models/sucursal.model');
const bcrypt = require("bcrypt-nodejs");

//Función para crear sucursal 
function newbranch(req, res) {
    var sucursalModel = Sucursal();
    var params = req.body;

    if(req.user.rol === 'admin'){
        Sucursal.find({$or: [{user: params.user}]}).exec((err, sucursal)=>{
            if (sucursal && sucursal.length>=1) {
                return res.status(500).send({message: 'Ya existe ese usuario'});
            }else{
                sucursalModel.empresa = req.user.sub
                sucursalModel.user = params.user
                sucursalModel.rol = 'sucursal'
                sucursalModel.nombreSucursal = params.nombreSucursal
                sucursalModel.direccionSucursal = params.direccionSucursal
                bcrypt.hash(params.password, null, null, (err, encryptpass)=>{
                    sucursalModel.password = encryptpass
                    sucursalModel.save((err, saveBranch)=>{
                        if (saveBranch){
                            return res.status(200).send({message: 'Se creo con exito la sucursal'})
                        }
                    })
                })
            }
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para editar sucursal 
function editbranch(req, res) {
    var idSucursal = req.params.idSucursal
    var params = req.body;
    if(req.user.rol === 'admin'){
        delete params.password, params.rol
        Sucursal.findByIdAndUpdate(idSucursal, params, {new: true}, (err, sucursal) => {
            if (err) return res.status(500).send({message: err})
            if (sucursal) return res.status(200).send({message: sucursal})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para eliminar sucursal 
function deletebranch(req, res) {
    var idSucursal = req.params.idSucursal
    if(req.user.rol === 'admin'){
        Sucursal.findByIdAndDelete(idSucursal, (err, sucursal) => {
            if (err) return res.status(500).send({mesaje: err})
            if (sucursal) return res.status(200).send({mesaje: 'Se elimino la sucursal con exito'})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para ver todas las sucursales 
function allbranch(req, res) {
    if(req.user.rol === 'admin'){
        Sucursal.find({$or: [{empresa: req.user.sub}]}, (err, sucursales) =>{
            if (err) return res.status(500).send({message: err})
            if (sucursales) return res.status(200).send({sucursales})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para ver una sucursal
function onebranch(req, res) {
    if(req.user.rol === 'admin'){
        Sucursal.findById(id, (err,sucursal) => {
            if (err) return res.status(500).send({mesaje: err})
            if (sucursal) return res.status(200).send({sucursal})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

module.exports = {
    newbranch,
    editbranch,
    deletebranch,
    allbranch,
    onebranch
}