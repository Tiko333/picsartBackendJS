if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const {connect, disconnect} = require('../db/mongo-db-connection');
const repositoryController = require('../models/mongo/mongo-repository-model');

(async () => {
    // connects to mongo
    await connect();

    // gets repositories from GitHub API by using Axios
    const repos = await repositoryController.getReposFromGitHub();

    // process the repositories
    const mappedRepos = await repositoryController.processRepos(repos);

    // saves it into mongo
    await repositoryController.saveRepos(mappedRepos);

    // disconnects from mongo , and exits
    disconnect();
})()