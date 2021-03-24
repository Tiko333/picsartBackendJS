const redisRepositoryModel = require('../models/redis/redis-repository-model');

// gets a count of repositories from Redis and send to the client a JSON
exports.countOfCurrentRepos = async function (req, res) {
    const reposCount = await redisRepositoryModel.getReposCount();
    res.status(200).json({
        status: 'success',
        code: 200,
        repositoriesCount: reposCount === null ? '0' : reposCount
    })
}

// gets all repositories from Redis and send to the client a JSON
exports.getAllRepos = async function (req, res) {
    const reposCount = await redisRepositoryModel.getRepos();

    if (reposCount) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: reposCount,
            amount: reposCount.length
        })
    } else {
        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'no repositories'
        })
    }
}