const redis = require('redis');
const subscriber = redis.createClient();
const redisRepository = require('./redis-repository-model');
const mongoRepository = require('../mongo/mongo-repository-model');

// subscribes on 'repositories' events and updates
// count of repositories in Redis if event occurs
exports.subscribeReposCount = async function () {
    subscriber.on('message', async function (channel, message) {
        if (channel === 'repositories') {
            console.log(`added ${message} repositories`);
            redisRepository.updateCount(+message);
        }
    });
    subscriber.subscribe('repositories');
}

// subscribes on 'saveRepos' events and updates
// repositories in Redis if event occurs
exports.subscribeRepos = async function () {
    subscriber.on('message', function (channel) {
        if (channel === 'saveRepos') {
            redisRepository.updateRepos();
        }
    });
    subscriber.subscribe('saveRepos');
}

// checks the count of 'repositories' from Mongo and
// Redis and if it is not equal it updates count in Redis
exports.checkReposCount = async function () {
    const mongoReposCount = await mongoRepository.getReposCount();
    const redisReposCount = await redisRepository.getReposCount();

    if (mongoReposCount === 0) {
        redisRepository.updateCount(0);
    } else if (+redisReposCount !== mongoReposCount) {
        redisRepository.updateCount(mongoReposCount - +redisReposCount);
    }
}

// checks 'repositories' from Mongo and Redis
// and if it is not equal it updates in Redis
exports.checkRepos = async function () {
    const mongoRepos = await mongoRepository.getRepos();
    redisRepository.saveRepos(mongoRepos);
}
