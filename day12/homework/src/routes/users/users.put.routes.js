const express = require('express');
let usersPutRoutes = express.Router();

let usersCtrl = require('../../controllers/users.controller');

usersPutRoutes.put('/users', usersCtrl.update);

module.exports = usersPutRoutes;