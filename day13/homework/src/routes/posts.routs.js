const app = require('express');
const postsRoutes = app.Router();

const postsGetRouts = require('./posts/posts.get.routs');
const postsPostRouts = require('./posts/posts.post.routs');
const postsPatchRouts = require('./posts/posts.patch.routs');
const postsDeleteRouts = require('./posts/posts.delete.routs');

postsRoutes.use(postsGetRouts);
postsRoutes.use(postsPostRouts);
postsRoutes.use(postsPatchRouts);
postsRoutes.use(postsDeleteRouts);

module.exports = postsRoutes;