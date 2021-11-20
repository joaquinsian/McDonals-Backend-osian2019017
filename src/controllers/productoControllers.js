'use strict'
const Producto = require('../models/productoModel')
//agregar producto

async function agregarProducto(req, res) {
    if(req.user.rol === "Doctor"){
        var citasModel = new Citas();
        var params = req.body;
        if(params.usuario && params.fecha_cita){
            citasModel.usuario = params.usuario;
            citasModel.doctor = req.user.sub;
            citasModel.fecha_cita = params.fecha_cita;

            citasModel.save((err, citaGuardada) => {
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(!citaGuardada){
                    return res.status(500).send({ mensaje: "No se ha podido almacenar la cita"})
                }else{
                    return res.status(200).send({citaGuardada})
                }
            })
        }else{
            return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}


//mostrar citas del doctor
async function obtenerCitas(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    await Citas.find({doctor: x.sub}).sort({fecha_cita: 1}).populate('usuario doctor').exec((err, citasDoc) => {
        if(err){
            console.log(err);
            return res.status(500).send({ mensaje: "Error en la petición" })
        }else if(!citasDoc){
            return res.status(500).send({mensaje: "No se ha podido obtener las citas"})
        }else{
            return res.status(200).send({citasDoc})
        }
    })
}

//obtener cita por id , funcional
async function obtenerCitasID(req, res) {
    var idCita = req.params.idCita;
    await Citas.findById(idCita).populate('usuario doctor').exec((err, cita) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición" })
        }else if(!cita){
            return res.status(500).send({ mensaje: "No se ha podido obtener la cita"})
        }else{
            return res.status(200).send({cita})
        }
    })
}
 
//editar cita, funciona con fecha
async function editarCitas(req, res){
    if(req.user.rol === "Doctor"){
        var idCita = req.params.idCita;
        var params = req.body;
        await Citas.findByIdAndUpdate(idCita, params, {new: true}, (err, citaEditada) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!citaEditada){
                return res.status(500).send({ mensaje: "No se ha podido editar la cita"})
            }else{
                return res.status(200).send({citaEditada})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//eliminar cita, funciona
async function eliminarCitas(req, res){
    if(req.user.rol === "Doctor"){
        var idCita = req.params.idCita;
        await Citas.findByIdAndDelete(idCita, (err,citaEliminada) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición" })
            }else if(!citaEliminada){
                return res.status(500).send({ mensaje: "No se ha podido eliminar la cita"})
            }else{
                return res.status(200).send({citaEliminada})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

module.exports = {
    
}
