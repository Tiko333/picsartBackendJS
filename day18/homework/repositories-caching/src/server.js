if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs/configs');
const app = express();
const {repoRoutes} = require('./routes/repositories-routes/repo-routes');
const {eventEmitter} = require('./listeners/repo-event-emitter');
const redisConnection = require('./db/redis-db-connection');

app.use(repoRoutes);

redisConnection.connect();
mongoose.connect(configs.url, configs.options).then(()=> {
    console.log('connected to MongoDB');

    app.listen(configs.PORT, () => {
        console.log(`app listening at http://localhost:${configs.PORT}`);
        eventEmitter.emit('checkReposCount');
        eventEmitter.emit('checkRepos');
        eventEmitter.emit('subscribe');
    });
}).catch(err => {
    console.log(err)
})
