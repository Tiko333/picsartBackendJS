const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const upload = require('../../middlewares/uploadImages');
const usersController = require('../../controllers/users.controller');
const check = require('../../middlewares/checkIsUserExistingByEmail');

router.post(
    '/register',
    upload.single('avatar'),
    body('email', 'email is not correct').isEmail(),
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
    check,
    usersController.register
);

router.post('/login',
    body('email', 'email is not correct').isEmail(),
    body('password', 'password length must be minimum 5').isLength({min: 5}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    },
    usersController.login
);

module.exports = router;