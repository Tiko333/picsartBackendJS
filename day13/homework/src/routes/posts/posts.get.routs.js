const express = require('express');
const postsGetRoutes = express.Router();

const postsController = require('../../controllers/posts.controller');
const authenticate = require('../../middlewares/authenticate');

postsGetRoutes.get('/blog/news', postsController.getAll);
postsGetRoutes.get('/blog/user/:id',authenticate, postsController.getByUserId);
postsGetRoutes.get('/blog/newest/:limit',authenticate, postsController.getNewest);
postsGetRoutes.get('/blog/search/:description',authenticate, postsController.getByDescription);
postsGetRoutes.get('/blog/photos/:postId',authenticate, postsController.getPhotosById);
postsGetRoutes.get('/blog/:id',authenticate, postsController.getById);
postsGetRoutes.get('/blog/top/:limit',authenticate, postsController.getTopByRating);

module.exports = postsGetRoutes;