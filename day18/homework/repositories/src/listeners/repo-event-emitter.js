const events = require('events');
const redis = require('../models/redis/redis');
const eventEmitter = new events.EventEmitter();

// adds a once listener to check counts of 'repositories' from mongo
// and Redis and  if not equal updates Redis when the app starts
eventEmitter.once('check', () => {
    redis.check();
});

// adds a listener to subscribe 'repositories' event
// which is updating count of repositories in Redis
eventEmitter.on('subscribe', () => {
    redis.subscribe();
});

module.exports.eventEmitter = eventEmitter;