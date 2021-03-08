const express = require('express');
const usersDeleteRoutes = express.Router();

const usersController = require('../../controllers/users.controller');
const authenticate = require('../../middlewares/authenticate');

usersDeleteRoutes.delete('/users/:id',authenticate, usersController.deleteById);

module.exports = usersDeleteRoutes;