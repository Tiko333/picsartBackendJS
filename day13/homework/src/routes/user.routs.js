const app = require('express');
const usersRoutes = app.Router();

const userGetRouts = require('./users/user.get.routs');
const userPostRouts = require('./users/user.post.routs');
const userPatchRouts = require('./users/user.patch.routs');
const userDeleteRouts = require('./users/user.delete.routs');

usersRoutes.use(userGetRouts);
usersRoutes.use(userPostRouts);
usersRoutes.use(userPatchRouts);
usersRoutes.use(userDeleteRouts);

module.exports = usersRoutes;