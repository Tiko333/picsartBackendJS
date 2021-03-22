if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const {connect, disconnect} = require('../db/mongo-db-connection');
const repositoryController = require('../models/mongo/mongo-repository-model');

// connects to mongo 'connect()', gets repositories from GitHub API by using
// Axios 'getRepos()', process the repositories 'processRepos()', saves it
// into mongo 'saveRepos()' and disconnects from mongo , and exits disconnect()
(async () => {
    await connect();

    const repos = await repositoryController.getRepos();

    const mappedRepos = await repositoryController.processRepos(repos);

    await repositoryController.saveRepos(mappedRepos);

    disconnect();
})()