const express = require('express');
let usersDeleteRoutes = express.Router();
let usersCtrl = require('../../controllers/users.controller');

usersDeleteRoutes.delete('/users/:id', usersCtrl.deleteById);

module.exports = usersDeleteRoutes;