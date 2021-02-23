const express = require('express');
let usersRoutes = express.Router();

let usersGetRoutes = require('./users/users.get.routes');
let usersPostRoutes = require('./users/users.post.routes');
let usersPutRoutes = require('./users/users.put.routes');
let usersDeleteRoutes = require('./users/users.delete.routes');

usersRoutes.use(usersGetRoutes);
usersRoutes.use(usersPostRoutes);
usersRoutes.use(usersPutRoutes);
usersRoutes.use(usersDeleteRoutes);

module.exports = usersRoutes;