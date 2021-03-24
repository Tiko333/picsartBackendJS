module.exports = {
    url: process.env.DB_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    PORT: process.env.PORT || 3000
}