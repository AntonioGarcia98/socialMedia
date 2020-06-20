'use strict'

var express = require('express');
var PostController = require('../controllers/post');

var api = express.Router();

api.post('/newPost',PostController.newPost);
api.get('/getPost/idPost/:id',PostController.getPost);
api.get('/getPosts',PostController.getPosts);

module.exports = api;