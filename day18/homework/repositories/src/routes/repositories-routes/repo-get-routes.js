const express = require('express');
const repoGetRouts = express.Router();

const {countOfCurrentRepos} = require('../../controllers/repository-controller');

// get endpoint to obtain the count of repositories from Redis
repoGetRouts.get('/repo/count', countOfCurrentRepos);

exports.repoGetRouts = repoGetRouts;