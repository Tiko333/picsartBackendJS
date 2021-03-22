const redis = require('redis');
const subscriber = redis.createClient();
const redisRepository = require('./redis-repository-model');
const repositoryModel = require('../mongo/mongo-repository-model');

// subscribes on 'repositories' events and updates
// count of repositories in Redis if event occurs
exports.subscribe = function () {
    subscriber.on('message', function (channel, message) {
        console.log(`added ${message} repositories`);
        redisRepository.updateCount(+message);
    });
    subscriber.subscribe('repositories');
}

// checks the count of 'repositories' from Mongo and
// Redis and if it is not equal it updates count in Redis
exports.check = async function () {
    const reposCount = await repositoryModel.getReposCount();
    const redisReposCount = await redisRepository.getReposCount();

    if (+redisReposCount !== reposCount) {
        redisRepository.updateCount(reposCount - +redisReposCount);
    }
}
