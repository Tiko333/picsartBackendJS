const {FileRepository} = require("../repository/fileRepository");

function UserService() {
    this.fileRepository = new FileRepository();
}

UserService.prototype.createUser = function (user) {
    this.fileRepository.create(user);
}

UserService.prototype.getAllUsers = function () {
    return this.fileRepository.getAllUsers();
}

UserService.prototype.getUserById = function (id) {
    return this.fileRepository.getUserById(id);
}

UserService.prototype.findByFirstname = function (firstname) {
    return this.fileRepository.findByFirstname(firstname);
}

UserService.prototype.updateUserById = function (parameters) {
    return this.fileRepository.updateUserById(parameters);
}

UserService.prototype.deleteUserById = function (id) {
    return this.fileRepository.deleteUserById(id);
}

exports.UserService = UserService;