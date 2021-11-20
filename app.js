'use strict'

const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


//importacion de rutas
const Login_routes = require('./src/routes/loginRoutes');
 
//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));


//cabeceras
app.use(cors());

//utilizacion de rutas
app.use('/CSMC', Login_routes)

module.exports = app;