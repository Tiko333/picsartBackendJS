const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const mongoRepository = require('../mongo/mongo-repository-model');


// gets repositories amount from Redis
exports.getReposCount = async function () {
    const repos = await client.get('reposCount');
    return repos;
}

// updates repositories amount in Redis
exports.updateCount = async function (count = 5) {
    if (count === 0) {
        client.set('reposCount', 0);
    } else {
        const reposCount = await client.get('reposCount');
        client.set('reposCount', +reposCount + count);
    }
}

// gets repositories from Redis
exports.getRepos = async function () {
    const repos = await client.get('repositories');
    if (repos.length !== 0) {
        return JSON.parse(repos);
    }
}

// saves repositories in Redis
exports.saveRepos = async function (repos) {
    if (repos.length > 0) {
        client.set('repositories', JSON.stringify(repos));
    } else {
        client.set('repositories', '');
    }
}

// updates repositories in Redis
exports.updateRepos = async function () {
    const mongoRepos = await mongoRepository.getRepos();
    client.set('repositories', JSON.stringify(mongoRepos));
}