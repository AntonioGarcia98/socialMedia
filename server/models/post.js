'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
    titulo: String,
    texto: String,
    descripcion: String,
    usuario: { type: Schema.ObjectId, ref: 'Usuario' },
    //objUsuario: 
});

module.exports = mongoose.model('Post', PostSchema, 'post');