const events = require('events');
const redis = require('../models/redis/redis');
const eventEmitter = new events.EventEmitter();

// adds a once listener to check counts of 'repositories' from mongo
// and Redis and if not equal updates Redis when the app starts
eventEmitter.once('checkReposCount', () => {
    redis.checkReposCount();
});

// adds a once listener to check 'repositories' from mongo
// and Redis and if not equal updates Redis when the app starts
eventEmitter.once('checkRepos', () => {
    redis.checkRepos();
});

// adds a listener to subscribe 'repositories' event which is
// updating repositories and count of repositories in Redis
eventEmitter.on('subscribe', () => {
    redis.subscribeReposCount();
    redis.subscribeRepos();
});

module.exports.eventEmitter = eventEmitter;