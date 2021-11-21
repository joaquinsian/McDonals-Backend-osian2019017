'use strict'
const Producto = require('../models/producto.model');

//Función para crear producto
function newproducto(req, res) {
    var productoModel = Producto();
    var params = req.body;

    if(req.user.rol === 'admin'){
        //producto de la empresa
        productoModel.empresa = req.user.sub
        productoModel.nombreProducto = params.nombreProducto
        productoModel.nombreProveedor = params.nombreProveedor
        productoModel.stock = 0
        productoModel.save((err, producto) => {
            if (err) return res.status(500).send({mesaje: err})
            if (producto) return res.status(500).send({producto})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para editar producto
function editproducto(req, res) {
    var idProducto = req.params.idProducto
    var params = req.body;

    if(req.user.rol === 'admin'){
        delete params.vendido
        Producto.findByIdAndUpdate(idProducto, params, {new: true}, (err, producto) => {
            if (err) return res.status(500).send({message: err})
            if (producto) {
                console.log(producto)
                Producto.updateMany({producto: idProducto}, {$set: {nombreProducto: params.nombreProducto}}, (err, producto) => {
                    if (err) return res.status(500).send({message: err})
                    if (producto) return res.status(200).send({mesaje: 'Se edito el producto correctamente'})
                })
            }
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para eliminar producto
function deleteproducto(req, res) {
    var idProducto = req.params.idProducto

    if(req.user.rol === 'admin'){
        Producto.findByIdAndDelete(idProducto, (err, producto) => {
            if (err) return res.status(500).send({message: err})
            if (producto) {
                Producto.deleteMany({producto: idProducto}, (err, productos) => {
                    if (err) return res.status(500).send({message: err})
                    if (productos) return res.status(200).send({mesaje: 'Se elimino el producto de todas las sucursales'})
                })
            }
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para ver todos los productos
function allproductos(req, res) {
    if(req.user.rol === 'admin' || req.user.rol === 'sucursal'){
        //Ver todos los productos de la empresa
        if (req.user.rol === 'admin') {
            Producto.find({$or: [{empresa: req.user.sub}]}).exec((err, productos) => {
                if (err) return res.status(500).send({message: err})
                if (productos) return res.status(200).send({productos})
            })
        }

        //Ver todos los productos de una sucursal
        if (req.user.rol === 'sucursal') {
            Producto.find({$or: [{sucursal: req.user.sub}]}).exec((err, productos) => {
                if (err) return res.status(500).send({message: err})
                if (productos) return res.status(200).send({productos})
            }) 
        }
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Funcion para vender o enviar productos
function enviarvender(req, res) {
    var idProducto = req.params.idProducto
    var params = req.body;

    if(req.user.rol === 'sucursal' || req.user.rol === 'admin'){
        Producto.findById(idProducto, (err, producto) => {
            if (producto.stock >= params.stock) {
                //Envio de un producto
                if (req.user.rol === 'admin') {
                    Producto.findOne({$or: [{producto: idProducto}, {sucursal: params.sucursal}]}).exec((err, enviarproducto) => {
                        if (err) return res.status(500).send({mesaje: err})
                        if (enviarproducto && enviarproducto.length >=1) {
                            //Producto enviado a sucursal
                            enviarproducto.stock = enviarproducto.stock + parseInt(params.stock)
                            Producto.findById(enviarproducto._id, {$set: {stock: enviarproducto.stock}}, (err, enviado) =>{
                                if (err) return res.status(500).send({message: err})
                                if (enviado) {
                                    //Producto descontado de la empresa
                                    producto.stock = producto.stock - parseInt(params.stock)
                                    Producto.findById(idProducto, {$set: {stock: producto.stock}}, (err,stock) => {
                                        if (err) return res.status(500).send({mesaje: err})
                                        if (stock) return res.status(200).send({enviado})
                                    })
                                }
                            })
                        }
                    })
                }

                //Venta de un producto
                if (req.user.rol === 'sucursal') {
                    delete params.sucursal, params.producto, params.vendido
                    params.vendido = producto.vendido + parseInt(params.stock)
                    params.stock = producto.stock - parseInt(params.stock)
                    Producto.findByIdAndUpdate(idProducto, params, {new: true}, (err, productovendido) => {
                        if (err) return res.status(500).send({message: err})
                        if (producto) return res.status(200).send({productovendido})
                    })
                }
            }else{
                return res.status(500).send({message: 'No hay stock suficiente'})
            }
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

//Función para ver solo un producto
function oneproducto(req, res) {
    var idProducto = req.params.idProducto

    if (req.user.rol === 'admin' || req.user.rol === 'sucursal') {
        Producto.findById(idProducto, (err, producto) => {
            if (err) return res.status(500).send({message: err})
            if (producto) return res.status(200).send({producto})
        })
    }else{
        return res.status(500).send({message: 'No posees los permisos necesarios'})
    }
}

module.exports = {
    newproducto,
    editproducto,
    deleteproducto,
    allproductos,
    enviarvender,
    oneproducto
}