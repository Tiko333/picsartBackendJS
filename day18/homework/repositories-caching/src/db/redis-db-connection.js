const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

// checks if connected to Redis
exports.connect = function () {
    client.on("connect", function () {
        console.log("connected to Redis");
    })
}