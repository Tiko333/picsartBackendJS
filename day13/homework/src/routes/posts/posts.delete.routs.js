const express = require('express');
const postsDeleteRoutes = express.Router();

const postsController = require('../../controllers/posts.controller');
const authenticate = require('../../middlewares/authenticate');

postsDeleteRoutes.delete('/blog/:id',authenticate, postsController.deleteById);

module.exports = postsDeleteRoutes;