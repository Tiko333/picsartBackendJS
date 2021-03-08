const posts = require('../models/posts.model');

async function getAll(req, res) {
    const allPosts = await posts.getAll();
    res.status(200).json({
        status: 'success',
        code: 200,
        data: allPosts,
        message: allPosts.length === 0 ? 'no posts' : 'posts successfully got'
    });
}

async function getByUserId(req, res) {
    const allPosts = await posts.getByUserId(req.params.id);
    if (allPosts !== null) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: allPosts,
            message: allPosts.length === 0 ? 'no posts' : 'posts successfully got'
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `not found record`,
            errors: `no posts of user by id: ${req.params.id}`
        });
    }

}

async function getById(req, res) {
    try {
        let post = await posts.getById(req.params.id);
        res.status(200).json({
            status: 'success',
            code: 200,
            data: post,
            message: post === null ? 'no post by id' : `post successfully got by id: ${req.params.id}`
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `not found record`,
            errors: `no post by id: ${req.params.id}`
        });
    }
}

async function getNewest(req, res) {
    let post = await posts.getNewestPosts(parseInt(req.params.limit));
    res.status(200).json({
        status: 'success',
        code: 200,
        data: post,
        message: post === null ? 'no post' : `newest posts successfully got by limit: ${req.params.limit}`
    });
}

async function getByDescription(req, res) {
    let post = await posts.getByDescription(req.params.description);

    res.status(200).json({
        status: 'success',
        code: 200,
        data: post,
        message: post.length !== 0 ? `posts got by description: ${req.params.description}` : `no post got by description: ${req.params.description}`
    });
}

async function getPhotosById(req, res) {
    let photos = await posts.getPhotosById(req.params.postId);
    if (photos) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: photos,
            message: photos.length !== 0 ? `post photos got successfully by id: ${req.params.postId}` : `no post photos by id: ${req.params.postId}`
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `not found record`,
            errors: `no post by id: ${req.params.postId}`
        });
    }
}

async function getTopByRating(req, res) {
    let top = await posts.getTopPostsByRating(parseInt(req.params.limit));
    res.status(200).json({
        status: 'success',
        code: 200,
        data: top,
        message: top.length === 0 ? 'no posts' : `top posts successfully got by limit: ${req.params.limit}`
    });
}

async function create(req, res) {
    req.body.files = req.files;
    const savedPost = await posts.save(req);
    if (savedPost.isCreated) {
        res.status(201).json({
            status: 'success',
            code: 201,
            message: `post successfully created`
        });
    }
    if (savedPost.isOtherUser) {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `you can not create posts for other users`
        });
    }
}

async function addPhotos(req, res) {
    let updatedPost = await posts.addPhotos(req);

    if (updatedPost.isUpdate) {
        res.status(200).json({
            status: 'success',
            code: 200,
            message: `photos added into post by id: ${req.params.id}`
        });
    }
    if (updatedPost.isOtherUser){
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not found`,
            errors: `user by id: ${req.user.id} do not have a post by id: ${req.params.id}`
        });

    }
    if (updatedPost.isNoPost) {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `photos do not added into post`,
            errors: `no post by id: ${req.params.id}`
        });
    }
}

async function update(req, res) {
    let updated = await posts.updateById(req);
    if (updated.isUpdate) {
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: `post successfully updated by id: ${req.params.id}`
        });
    }
    if (updated.isNoPost) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not found`,
            errors: `post by id: ${req.params.id} do not exists`
        });
    }
    if (updated.isOtherUser) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not found`,
            errors: `user by id: ${req.user.id} do not have a post by id: ${req.params.id}`
        });
    }
}

async function updateLikes(req, res) {
    let result = await posts.updateLikesById(req);
    if (result.isLiked) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not liked`,
            errors: `post by id: ${req.params.id} already liked by user by id: ${req.user.id}`
        });
    }
    if (result.isUpdate) {
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: `post likes updated: ${result.likesAmount}`
            });
    }
    if (result.isNoPost) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not found`,
            errors: `post by id: ${req.params.id} do not exists`
        });
    }
}

async function deleteById(req, res) {
    let result = await posts.deleteById(req);

    if (result.isDeleted) {
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: `post successfully deleted by id: ${req.params.id}`
        });
    }
    if (result.isOtherUser) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `post not found`,
            errors: `user by id: ${req.user.id} do not have a post by id: ${req.params.id}`
        });
    }
    if (result.isNoPost) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            errors: `post by id: ${req.params.id} do not exists`
        });
    }
}

module.exports = {
    getAll,
    getByUserId,
    getById,
    getNewest,
    getByDescription,
    getPhotosById,
    getTopByRating,
    create,
    addPhotos,
    update,
    updateLikes,
    deleteById
}