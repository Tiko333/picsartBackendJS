const {Users} = require("../models/users.model");
const validate = require("../utils/validateUser");
const users = new Users();

function getAll(req, res) {
    res.status(200).json(users.getAll());
}

function getById(req, res) {
    res.status(200).json(users.getById(+req.params.id));
}

function search(req, res) {
    const {substring} = req.params;
    res.status(200).json(users.findByFirstname(substring));
}

function create(req, res, next) {
    let valid = validate(req.body);
    if (valid !== undefined) {
        return next(valid);
    }
    users.save(req.body)
    res.status(201).json(req.body);
}

function update(req, res) {
    const body = req.body;
    users.updateById(body);
    res.status(200).json(req.body);
}

function deleteById(req, res) {
    users.deleteById(+req.params.id)
    res.status(204).end();
}

module.exports = {
    getAll,
    getById,
    search,
    create,
    update,
    deleteById
}