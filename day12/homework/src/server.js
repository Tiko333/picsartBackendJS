require('dotenv').config();
const express = require('express');
let configs = require('./configs/configs');
const server = express();
const usersRoutes = require('./routes/users.routs');

server.use(express.json());
server.use(usersRoutes);

server.use((req, res, next) => {
    res.json({error: 404})
})

server.listen(configs.PORT, () => {
    console.log(`Example app listening at http://localhost:${configs.PORT}/users`);
});