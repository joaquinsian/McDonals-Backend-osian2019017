'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const app = require('./app')
const Empresa = require('./src/models/empresa.model')
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@mcdonals.oeuhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('connecting in the data base');
    app.listen(process.env.PORT || 3000, function(){
        var empresaModel = Empresa()
        Empresa.find({$or: [{user: "AdminMc"}]}).exec((err, usernew)=>{
            if (usernew, usernew.length>=1){
                console.log('Ya existe un administrador creado')
            }else{
                empresaModel.user = "AdminMc"
                empresaModel.rol = "admin"
                bcrypt.hash("123456", null, null, (err, encryptpass)=>{
                    empresaModel.password = encryptpass
                    empresaModel.save((err, saveUser)=>{
                        if(saveUser){
                            console.log("Se creo el usuario Admin")
                        }
                    })
                })
            }
        })
    })
}).catch(err => console.log(err))