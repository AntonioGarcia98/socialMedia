'use strict'

var Post = require('../models/post');

//Crear nuevo usuario
function newPost(req, res) {
    var params = req.body; //Toma todos los campos que llegan por req en body, y los pone en params
    var post = new Post();
    if (params.titulo && params.texto && params.descripcion && params.usuario) {
        //Seguir con el video jeje
        post.titulo = params.titulo;
        post.texto = params.texto;
        post.descripcion = params.descripcion;
        post.usuario = params.usuario;

        post.save((err, postStored) => {
            if (err) {
                return res.status(200).send({ message: 'Error al insertar el nuevo post ' + err, success: false })
            }
            if (postStored) {
                res.status(200).send({ message: "Se creo el post correctamente", success: true });
            } else {
                res.status(200).send({ message: 'No se ha registrado el nuevo', success: false });
            }
        });
    } else {
        res.status(200).send({
            message: "Hubo un problema al recibir los datos.",
            success: false
        });
    }
}

//get post por ID
function getPost(req, res) {
    var postId = req.params.id;

    Post.findById(postId, (err, post) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' });

        if (!post) return res.status(200).send({ message: 'El post no existe' });

        return res.status(200).send({ post });
    });
}

function getPostByUser(req, res) {
    var userID = req.user.sub;

    Post.find({ usuario: userID }, (err, posts) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion' });

        if (!posts) return res.status(200).send({ message: 'No hay posts disponibles', success: false });

        return res.status(200).send({
            posts
        });
    }).sort('_id');
}


//Consultar usuarios por paginas
function getPosts(req, res) {

    var postId = req.params.id;
    if (postId) {
        Post.find({ usuario: postId }, (err, posts) => {
            if (err) return res.status(200).send({ message: 'Error en la peticion cp', success: false });

            if (!posts) return res.status(200).send({ message: 'No hay posts disponibles', success: false });

            return res.status(200).send({
                posts
            });
        }).sort('_id').populate({ path: 'Usuario' });
    }

    Post.find((err, posts) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion sp', success: false });

        if (!posts) return res.status(200).send({ message: 'No hay posts disponibles', success: false });

        return res.status(200).send({
            posts
        });
    }).sort('_id').populate({ path: 'Usuario' });

}

//update post
//updateFaq
function updatePost(req, res) {
    var postId = req.params.id;
    var update = req.body;

    Post.findByIdAndUpdate(postId, update, { new: true }, (err, postUpdated) => {
        if (err) return res.status(200).send({ message: 'Error en la peticion', success: false });

        if (!postUpdated) return res.status(200).send({ message: 'No se ha podido actualizar', success: false });

        return res.status(200).send({
            message: "Se edito el post correctamente",
            success: true
        });
    });
}

//Borrar usuario
function deletePost(req, res) {
    var post = req.params.id;

    Post.deleteOne({ _id: post }, err => {
        if (err) return res.status(200).send({ message: 'Error al eliminar post', success: false });

        return res.status(200).send({ message: 'Post Eliminado', success: true });
    });
}

module.exports = {
    newPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
    getPostByUser
}