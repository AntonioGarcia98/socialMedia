'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    pass: String,
    tipoUsuario: Number,
    image: String,
    descripcion: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuario');