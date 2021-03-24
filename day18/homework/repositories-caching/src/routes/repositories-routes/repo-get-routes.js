const express = require('express');
const repoGetRouts = express.Router();

const repositoryController = require('../../controllers/repository-controller');

// get endpoint to obtain the count of repositories from Redis
repoGetRouts.get('/repos/count', repositoryController.countOfCurrentRepos);

// get endpoint to obtain repositories from Redis
repoGetRouts.get('/repos', repositoryController.getAllRepos);

exports.repoGetRouts = repoGetRouts;