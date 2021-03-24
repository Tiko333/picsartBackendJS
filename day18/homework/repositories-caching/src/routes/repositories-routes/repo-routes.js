const app = require('express');
const repoRoutes = app.Router();

const {repoGetRouts} = require('./repo-get-routes');

// get routes for repositories
repoRoutes.use(repoGetRouts);

exports.repoRoutes = repoRoutes;