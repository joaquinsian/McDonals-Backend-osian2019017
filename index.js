'use strict'
const adminController = require('./src/controllers/adminControllers')
const mongoose = require('mongoose')
const app = require('./app')
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CS_Mcdonals', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).then(()=>{
    console.log('connecting in the data base');
    crearAdmin();

    app.listen(3000, function(){
        console.log('the service up in the port : 3000')
    })
}).catch(err => console.log(err))

//admin por default
const crearAdmin = () => {
    adminController.adminDefault("AdminMc","123456")
}
