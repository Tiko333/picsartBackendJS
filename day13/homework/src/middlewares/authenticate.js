const jsonwebtoken = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req.user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentication failed'
        })
    }
}

module.exports = authenticate;