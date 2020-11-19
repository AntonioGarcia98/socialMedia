'use strict'

var mongoose = require('mongoose');

//var ObjectId = mongoose.Types.ObjectId();

var ObjectId = require('mongodb').ObjectID;

var User = require('../models/usuario');

//var mongoosePaginate = require('mongoose-pagination');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

var md_auth = require('../middleware/authenticated');


//Crear nuevo usuario
function newUsuario(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var user = new User();
    if (params.nombre && params.apellidos && params.correo && params.pass && params.descripcion) {
        //Seguir con el video jeje

        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.tipoUsuario = 0; //cambiar a 1
        user.correo = params.correo.toLowerCase();
        user.tipoUsuario = params.tipoUsuario;
        user.image = params.image;
        user.descripcion = params.descripcion;

        //Controlar los usuarios repetidos por correo
        User.findOne({ correo: user.correo.toLowerCase() }).exec((err, users) => {
            if (err) return res.status(500).send({ message: "Error en la busqueda", success: false })
            if (users) {
                return res.status(200).send({
                    message: "El correo ya esta siendo usado por otro usuario.",
                    success: false
                });
            } else {
                bcrypt.hash(params.pass, null, null, (err, hash) => {
                    if (err) return res.status(500).send({ message: "Error al encriptar la contraseña", success: false })
                    user.pass = hash;
                    User.find({}).sort({ $natural: -1 }).exec(function(err, doc) {
                        if (err) {
                            res.status(200).send({ message: 'No se ha registrado el usuario', success: false });
                        }
                        //var x = doc[0].idUsuario + 1;
                        user.idUsuario = 0;
                        //user.tipoUsuario = 0;//Quitar en el front
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(200).send({ message: 'Error al insertar el usuario ' + err, success: false })
                            }
                            if (userStored) {
                                res.status(200).send({ message: "Se creo el usuario correctamente", success: true, user: userStored, pass: params.pass });
                            } else {
                                res.status(200).send({ message: 'No se ha registrado el usuario', success: false });
                            }
                        });
                    });

                    //res.status(200).send({message:'Simon ' + valor.toString});
                });
            }
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos.",
            success: false
        });
    }
}

//Consultar usuarios
function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!user) return res.status(404).send({ message: 'El usuario no existe', success: false });

        return res.status(200).send({ user });
    });
}

//Consultar usuarios por paginas
function getUsers(req, res) {
    // var identity_user_id = req.user.sub;

    var page = 1;

    User.find((err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles', success: false });

        return res.status(200).send({
            users
        });
    }).sort('_id');
}

//Borrar usuario
function deleteUser(req, res) {
    var tipoUsuario = req.user.tipoUsuario;
    //var usuario = req.user.sub;
    var usuario = req.params.id;
    User.deleteOne({ _id: usuario }, err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar el usuario', success: false });

        return res.send({ message: 'Usuario Eliminada', success: true });
    });
}

//Actualizar usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    //borrar propiedad password
    delete update.password;

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });

        if (!userUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito el usuario correctamente",
            success: true
        });
    });
}

//Log In
function loginUser(req, res) {
    var params = req.body;

    var email = params.correo;
    var password = params.pass;

    User.findOne({ correo: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', success: false });
        //return res.status(200).send({message: 'Recibi esto '+params.correo + ' ' + params.password});
        if (user) {

            bcrypt.compare(password, user.pass, (err, check) => {
                if (err) return res.status(200).send({ message: 'Correo o contraseña incorrecta', success: false });
                //console.log(user);
                if (check) {
                    var userReturn = user;
                    userReturn.password = undefined;
                    return res.status(200).send({
                        token: jwt.createToken(user),
                        success: true,
                        tipoUsuario: user.tipoUsuario,
                        message: "Se inicio sesion correctamente",
                        user: userReturn
                    });

                } else {
                    return res.status(200).send({ message: 'Correo o contraseña incorrecta', success: false });
                }
            });
        } else {
            return res.status(200).send({ message: 'El usuario no existe', success: false });
        }
    });
}

module.exports = {
    newUsuario,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
}