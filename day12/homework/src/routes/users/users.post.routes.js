const express = require('express');
let usersPostRoutes = express.Router();

let usersCtrl = require('../../controllers/users.controller');

usersPostRoutes.post('/users', usersCtrl.create);

module.exports = usersPostRoutes;