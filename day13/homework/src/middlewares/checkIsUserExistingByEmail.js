const users = require('../models/users.model');
const fs = require('fs');

let check = async (req, res, next) => {
    const userByEmail = await users.getUserByEmail(req.body.email);
    if (userByEmail === null) {
        next()
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `user by ${req.body.email} email already registered`
        });

        if (req.file.path.indexOf(',') > 0) {
            const split = req.file.path.split(',');
            for (let item of split) {
                fs.unlinkSync(`${item}`);
            }
        } else {
            try {
                fs.unlinkSync(`${req.file.path}`);
            } catch (err) {
                console.error(err)
            }
        }

    }
}

module.exports = check;