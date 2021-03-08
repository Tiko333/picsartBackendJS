const express = require('express');
const usersPatchRoutes = express.Router();

const usersController = require('../../controllers/users.controller');
const authenticate = require('../../middlewares/authenticate');
const {body, validationResult} = require('express-validator');

usersPatchRoutes.patch('/users/:id',
    authenticate,
    body('password', 'password length must be minimum 5').isLength({min: 5}),
    body('name', 'name length must be minimum 2').isLength({min: 2}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    },
    usersController.update
);

module.exports = usersPatchRoutes;