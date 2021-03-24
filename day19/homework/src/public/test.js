if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const myStatic = require('./middlewares/myStaticMiddleware');
const configs = require('./configs/configs');

app.use('/public', myStatic.static('src/public'));

app.listen(configs.PORT, () => {
    console.log(`Example app listening at http://localhost:${configs.PORT}`)
})