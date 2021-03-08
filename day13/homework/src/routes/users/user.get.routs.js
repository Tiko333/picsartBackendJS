const express = require('express');
const usersGetRoutes = express.Router();

const usersController = require('../../controllers/users.controller');
const authenticate = require('../../middlewares/authenticate');

usersGetRoutes.get('/users', authenticate, usersController.getAll);
usersGetRoutes.get('/users/:id',authenticate, usersController.getById);
usersGetRoutes.get('/users/search/:search',authenticate, usersController.getByName);

module.exports = usersGetRoutes;