const {Users} = require("../models/users.model");
const validate = require("../utils/validateUser");
const users = new Users();

function getAll(req, res) {
    res.status(200).json({
        status: 'success',
        code: 200,
        data: users.getAll(),
        message: 'users successfully got'
    });
}

function getById(req, res) {
    let byId = users.getById(+req.params.id);
    if (byId !== undefined) {
        res.status(200).json({
            status: 'success',
            code: 200,
            data: users.getById(+req.params.id),
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

function search(req, res) {
    const {substring} = req.params;
    let findByFirstname = users.findByFirstname(substring);
    res.status(200).json({
        status: 'success',
        code: 200,
        data: findByFirstname,
        message: findByFirstname.length > 0 ? `users successfully got by search: ${substring}` : `users not found by search: ${substring}`
    });
}

function create(req, res, next) {
    let valid = validate(req.body);
    if (valid !== undefined) {
        return next(valid);
    }
    users.save(req.body)

    res.status(201).json({
        status: 'success',
        code: 201,
        data: req.body,
        message: `user successfully created`
    });
}

function update(req, res) {
    let byId = users.getById(+req.body.id);
    if (byId !== undefined) {
        const body = req.body;
        users.updateById(body);
        res.status(200).json({
            status: 'success',
            code: 200,
            data: req.body,
            message: `user successfully updated by id: ${req.body.id}`
        });
    } else {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: `not found record`,
            errors: `no user by id: ${req.body.id}`
        });
    }
}

function deleteById(req, res) {
    let byId = users.getById(+req.params.id);
    if (byId !== undefined) {
        users.deleteById(+req.params.id)
        res.status(200).json({
            status: 'success',
            code: 200,
            message: `user successfully deleted by id: ${req.params.id}`
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

module.exports = {
    getAll,
    getById,
    search,
    create,
    update,
    deleteById
}