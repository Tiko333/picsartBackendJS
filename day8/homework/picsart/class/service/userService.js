const {User} = require("../model/user");
const {Admin} = require("../model/admin");
const {Repository} = require("../repository/repository");

class UserService {
    constructor() {
        this.repository = new Repository();
    }

    createUser(name, age, pic) {
        let user = new User(name, age, pic);
        this.repository.addUser(user);
        return user;
    }

    createAdmin(name, age) {
        return new Admin(name, age, this.repository);
    }

    getUsersByName(name) {
        return this.repository.getUsersByName(name);
    }

    getUsersByAge(age) {
        return this.repository.getUsersByAge(age);
    }

    getAllUsers() {
        return this.repository.getAllUsers();
    }
}

exports.UserService = UserService;