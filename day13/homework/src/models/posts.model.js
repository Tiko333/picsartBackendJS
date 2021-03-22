const Post = require('./schemas/post.schema.js');
const mongoose = require('mongoose');
const fs = require('fs');

const save = async (req) => {
    let result = {};
    if (req.user.id == req.body.userByAuthorId._id) {
        let author = {
            authorId: req.body.userByAuthorId._id,
            name: req.body.userByAuthorId.name,
            email: req.body.userByAuthorId.email
        }
        if (req.body.files) {
            let path = '';
            req.body.files.forEach(function (files, index, arr) {
                path = path + files.path.slice(files.path.indexOf('/')) + ','
            })
            path = path.substring(0, path.lastIndexOf(','));
            req.body.photos = path;
        }

        const newPost = new Post({
            title: req.body.title,
            author: author,
            text: req.body.text,
            description: req.body.description,
            photos: req.body.photos,
            likes: {
                userIds: '',
                amount: 0
            },
        });

        const savedPost = await newPost.save();
        if (savedPost) {
            result.isCreated = true;
            return result;
        }
    } else {
        let path = '';
        if (req.body.files) {
            req.body.files.forEach(function (files, index, arr) {
                path = path + files.path.slice(files.path.indexOf('/')) + ','
            })
            path = path.substring(0, path.lastIndexOf(','));

        }
        if (path.indexOf(',') > 0) {
            const split = path.split(',');
            for (let item of split) {
                fs.unlinkSync(`src${item}`);
            }
        } else {
            try {
                fs.unlinkSync(`src/${path}`);
            } catch (err) {
                console.error(err)
            }
        }

        result.isOtherUser = true;
        return result;
    }
}

const getAll = async () => {
    const posts = await Post.find().sort({createdAt: 'descending'});
    return posts;
}

const getByUserId = async (id) => {
    const posts = await Post.find({'author.authorId': mongoose.Types.ObjectId(id)});
    return posts;
}

const getById = async (id) => {
    const post = await Post.findById(id);
    return post;
}

const getNewestPosts = async (limit) => {
    const posts = await Post.find().sort({createdAt: 'descending'}).limit(limit)
    return posts;
}

const getByDescription = async (description) => {
    let search = await Post.find({description: {$regex: description, $options: "i"}});
    return search;
}

const getPhotosById = async (id) => {
    let post = await Post.findById(id);
    if (post !== null) {
        return post.photos;
    }
}

const getTopPostsByRating = async (limit) => {
    const posts = await Post.find().sort({'likes.amount': 'descending'}).limit(limit)
    return posts;
}

const addPhotos = async (req) => {
    let path = '';
    if (req.files) {
        req.files.forEach(function (files, index, arr) {
            path = path + files.path.slice(files.path.indexOf('/')) + ','
        })
        path = path.substring(0, path.lastIndexOf(','));
    }

    let result = {};
    const postById = await Post.findById(req.params.id);

    if (postById && postById.author.authorId == req.user.id) {
        postById.photos = postById.photos + `,${path}`;
        const updatedPost = await Post.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    photos: postById.photos
                }
            }
        );
        if (updatedPost.nModified > 0) {
            result.isUpdate = true;
            return result;
        }
    }
    if (postById) {
        result.isOtherUser = true;
    } else {
        result.isNoPost = true;
    }

    if (path.indexOf(',') > 0) {
        const split = path.split(',');
        for (let item of split) {
            fs.unlinkSync(`src${item}`);
        }
    } else {
        try {
            fs.unlinkSync(`src${path}`);
        } catch (err) {
            console.error(err)
        }
    }

    return result;
}

const updateById = async (req) => {
    let result = {};
    let postById = await Post.findById(req.params.id);
    if (postById && postById.author.authorId == req.user.id) {
        const updatedPost = await Post.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    title: req.body.title,
                    text: req.body.text,
                    description: req.body.description
                }
            }
        );
        if (updatedPost.nModified > 0) {
            result.isUpdate = true;
            return result;
        }
    }
    if (postById) {
        result.isOtherUser = true;
    } else {
        result.isNoPost = true;
    }

    return result;
}

const updateLikesById = async (req) => {
    let result = {};
    let postById = await Post.findById(req.params.id);
    let split;
    if (postById) {
        if (postById.likes.userIds.indexOf(',')) {
            split = postById.likes.userIds.split(',');
            for (let i = 0; i < split.length; i++) {
                if (req.user.id == split) {
                    result.isLiked = true
                    return result;
                }
            }
        } else {
            if (req.user.id == postById.likes.userIds) {
                result.isLiked = true
                return result;
            }
        }

        postById.likes.userIds = postById.likes.userIds.length === 0 ? postById.likes.userIds + `${req.user.id}` : postById.likes.userIds + `,${req.user.id}`;
        const updatedPost = await Post.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    'likes.userIds': postById.likes.userIds,
                    'likes.amount': postById.likes.amount + 1
                }
            }
        );
        if (updatedPost.nModified > 0) {
            result.isUpdate = true
            result.likesAmount = postById.likes.amount + 1
            return result;
        }
    } else {
        result.isNoPost = true;
    }

    return result;
}

const deleteById = async (req) => {
    let result = {};
    const post = await Post.findById(req.params.id);

    if (post && post.author.authorId == req.user.id) {
        let removedPost = await Post.deleteOne({_id: req.params.id});

        if (removedPost.deletedCount > 0) {
            if (post.photos.indexOf(',') > 0) {
                const split = post.photos.split(',');
                for (let item of split) {
                    fs.unlinkSync(`src${item}`);
                }
            } else {
                try {
                    fs.unlinkSync(`src/${post.photos}`);
                } catch (err) {
                    console.error(err)
                }
            }
            result.isDeleted = true;
            return result;
        }
    }
    if (post) {
        result.isOtherUser = true;
    } else {
        result.isNoPost = true;
    }

    return result;
}

const deleteByAuthorId = async (id) => {
    let posts = await Post.find({'author.authorId': mongoose.Types.ObjectId(id)});

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].photos.indexOf(',') > 0) {
            const split = posts[i].photos.split(',');
            for (let item of split) {
                fs.unlinkSync(`src${item}`);
            }
        } else {
            try {
                fs.unlinkSync(`src/${posts[i].photos}`);
            } catch (err) {
                console.error(err)
            }
        }
    }
    await Post.deleteMany({'author.authorId': mongoose.Types.ObjectId(id)});
}

const updatePostAuthor = async (body) => {
    let posts = await Post.updateMany(
        {'author.authorId': mongoose.Types.ObjectId(body.id)},
        {
            $set: {
                'author.name': body.name
            }
        }
    );

    return posts;
}

module.exports = {
    save,
    getAll,
    getByUserId,
    getById,
    getNewestPosts,
    getByDescription,
    getPhotosById,
    getTopPostsByRating,
    addPhotos,
    updateById,
    updateLikesById,
    deleteById,
    deleteByAuthorId,
    updatePostAuthor
}