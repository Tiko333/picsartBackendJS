const express = require('express');
const postsPatchRoutes = express.Router();
const {body, validationResult} = require('express-validator');

const postsController = require('../../controllers/posts.controller');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/uploadImages');

postsPatchRoutes.patch('/blog/:id',
    authenticate,
    body('title', 'title must be not empty').notEmpty(),
    body('text', 'text must be not empty').exists(),
    body('description', 'description must be not empty').exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    },
    postsController.update
);

postsPatchRoutes.patch('/blog/photos/:id'
    ,authenticate,
    upload.array('photos'),
    postsController.addPhotos
);

postsPatchRoutes.patch('/blog/likes/:id',
    authenticate,
    postsController.updateLikes
);

module.exports = postsPatchRoutes;