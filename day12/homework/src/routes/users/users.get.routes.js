const express = require('express');
let usersGetRoutes = express.Router();

let usersCtrl = require('../../controllers/users.controller');

usersGetRoutes.get('/users', usersCtrl.getAll);
usersGetRoutes.get('/users/:id', usersCtrl.getById);
usersGetRoutes.get('/users/search/:substring', usersCtrl.search);

module.exports = usersGetRoutes;