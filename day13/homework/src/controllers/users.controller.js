const users = require('../models/users.model');
const posts = require('../models/posts.model');

async function register(req, res) {
    const registeredUser = await users.register(req.body, req.file);
    if (registeredUser !== null) {
        res.status(201).json({
            status: 'success',
            code: 201,
            data: registeredUser,
            message: `user registered`,
            token: registeredUser.token
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `user not registered`
        });
    }
}

async function login(req, res) {
    const loggedInUser = await users.login(req.body);
    if (loggedInUser) {
        if (loggedInUser.error === undefined) {
            res.status(200).json({
                status: 'success',
                code: 200,
                data: loggedInUser,
                message: `user logged in`,
                token: loggedInUser.token
            });
        } else {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: `wrong password `
            });
        }
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `user by email ${req.body.email} not exists`
        });
    }

}

async function getAll(req, res) {
    const allUsers = await users.getAll();
    res.status(200).json({
        status: 'success',
        code: 200,
        data: allUsers,
        message: allUsers.length === 0 ? 'no users' : 'users successfully got'
    });
}

async function getById(req, res) {
    let user = await users.getById(req.params.id);
    if (user !== null) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: user,
            message: `user successfully got by id: ${req.params.id}`
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `not found record`,
            errors: `no user by id: ${req.params.id}`
        });
    }
}

async function getByName(req, res) {
    let searchResult = await users.getByName(req.params.search);

    if (searchResult !== null) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: searchResult,
            message: searchResult.length === 0 ? `no user by search: ${req.params.search}` : `user successfully got by search: ${req.params.search}`
        });
    }
}

async function update(req, res) {
    const body = req.body;
    body.id = req.params.id;

    let updated = await users.updateById(body);

    if (updated.updatedUser.nModified > 0 && updated.updatedPostAuthor.nModified > 0) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: updated,
            message: `user successfully updated by id: ${req.params.id}`
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `user not found`,
            errors: `no user by id: ${req.params.id}`
        });
    }
}

async function deleteById(req, res) {
    let deleted = await users.deleteById(req);
    if (deleted.isDeleted) {
        res.status(200).json({
            status: 'success',
            code: 200,
            message: `user successfully deleted by id: ${req.params.id}`
        });
        posts.deleteByAuthorId(req.params.id);
    }
    if (deleted.isOtherUser){
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `other user`,
            errors: `you user by id: ${req.user.id} can not delete other users`
        });
    }
    if (deleted.isUserNotExisting){
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `user not found`,
            errors: `no user by id: ${req.params.id}`
        });
    }
}

module.exports = {
    register,
    login,
    getAll,
    getById,
    getByName,
    update,
    deleteById
}