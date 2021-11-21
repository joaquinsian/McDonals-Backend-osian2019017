'use strict'

const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//cabeceras
app.use(cors());

//importacion de rutas
const Empresa_routes = require('./src/routes/empresa.routes');
const Sucursal_routes = require('./src/routes/sucursal.routes');
const Producto_routes = require('./src/routes/producto.routes')

//utilizacion de rutas
app.use('/CSMC', Empresa_routes)
app.use('/CSMC', Sucursal_routes)
app.use('/CSMC', Producto_routes)

//exportacion de rutas
module.exports = app;