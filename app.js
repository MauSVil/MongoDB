'use strict'

var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// cargar rutas
var frutaRoutes = require('./routes/fruta');

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configurar CORS

//rutas base
app.use('/api', frutaRoutes)

module.exports = app;