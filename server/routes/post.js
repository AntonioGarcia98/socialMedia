'use strict'

var express = require('express');
var PostController = require('../controllers/post');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newPost', PostController.newPost);
api.get('/getPost/idPost/:id', PostController.getPost);
api.get('/getPosts/?id', PostController.getPosts);
api.post('/updatePost/idPost/:id', PostController.updatePost);
api.post('/deletePost/idPost/:id', PostController.deletePost);
api.get('/getPostsByUser', md_auth.ensureAuth, PostController.getPostByUser);

module.exports = api;