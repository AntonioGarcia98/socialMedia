'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
    titulo: String,
    texto: String,
    descripcion: String,
    usuario: String
});

module.exports = mongoose.model('PostSchema',PostSchema,'post');