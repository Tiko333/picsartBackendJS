const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

// gets repositories amount from Redis
exports.getReposCount = async function () {
    const repos = await client.get('repos');
    return repos;
}

// updates repositories amount in Redis
exports.updateCount = async function (count = 5) {
    const reposCount = await client.get('repos');
    client.set('repos', +reposCount + count);
}