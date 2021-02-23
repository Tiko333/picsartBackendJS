const {FileModel} = require("./fileModel");

function Users() {}

Users.prototype = Object.create(FileModel.prototype);
Users.prototype.constructor = Users;

Users.prototype.save = function (user) {
    this.create(user);
}

Users.prototype.getAll = function () {
    return this.getAllUsers();
}

Users.prototype.getById = function (id) {
    return this.getUserById(id);
}

Users.prototype.findByFirstname = function (firstname) {
    return this.findUsersByFirstname(firstname);
}

Users.prototype.updateById = function (parameters) {
    this.updateUserById(parameters);
}

Users.prototype.deleteById = function (id) {
    this.deleteUserById(id);
}

exports.Users = Users;