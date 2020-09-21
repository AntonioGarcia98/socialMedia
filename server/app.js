'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var postRoutes = require('./routes/post');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors

//rutas
app.get('/pruebas', (req, res) => {
    res.status(200).send({
        message: 'Accion de prueba en servidor de node js'
    });
});

app.use('/api', postRoutes);

//exportar
module.exports = app;