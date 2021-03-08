require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {PORT} = require('./configs/configs');
const postsRouts = require('./routes/posts.routs');
const usersRouts = require('./routes/user.routs');
const server = express();

server.use(express.json())
server.use(usersRouts);
server.use(postsRouts);
server.use('/photos', express.static('src/photos'));

server.use((req, res, next) => {
    res.json({
        status: 'error',
        code: 400,
        message: 'not found endpoint',
        errors: `no such endpoint for method: ${req.method} ${req.path}`
    })
})

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to DB')
});

server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});