const {getReposCount} = require('../models/redis/redis-repository-model');

// gets a count of repositories from Redis and send to the client a JSON
exports.countOfCurrentRepos = async function (req, res) {
    const reposCount = await getReposCount();
    res.status(200).json({
        status: 'success',
        code: 200,
        repositoriesCount: reposCount
    })
}