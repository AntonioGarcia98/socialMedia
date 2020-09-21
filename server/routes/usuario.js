'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();

api.post('/newUsuario', UsuarioController.newUsuario);
api.get('/getUsuario/idUsuario/:id', UsuarioController.getUser);
api.get('/getUsuarios', UsuarioController.getUsers);
api.post('/updateUser/idUser/:id', UsuarioController.updateUser);
api.post('/login', UsuarioController.loginUser);

module.exports = api;