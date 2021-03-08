const express = require('express');
const postsPostRoutes = express.Router();

const postsController = require('../../controllers/posts.controller');
const authenticate = require('../../middlewares/authenticate');
const {body, validationResult} = require('express-validator');
const upload = require('../../middlewares/uploadImages');
const checkIsUserExistingById = require('../../middlewares/checkIsUserExistingById');

postsPostRoutes.post('/blog',
    authenticate,
    upload.array('photos'),
    body('authorId', 'author id length must be 24').notEmpty(),
    body('title', 'title must be not empty').notEmpty(),
    body('text', 'text must be not empty').exists(),
    body('description', 'text must be not empty').exists(),
    checkIsUserExistingById,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    },
    postsController.create
);

module.exports = postsPostRoutes;