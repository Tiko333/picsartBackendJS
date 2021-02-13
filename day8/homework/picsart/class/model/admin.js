const {BaseUser} = require("./baseUser");

class Admin extends BaseUser {
    constructor(name, age, repository) {
        super(name, age);
        this.repository = repository;
        this.accountType = 'admin';
    }

    toString() {
        let nameAge = super.toString.call(this);
        return `${nameAge} Account Type: ${this.accountType}`;
    }

    getUsers() {
        return this.repository.getAllUsers();
    }

    deleteUserByName(name) {
        this.repository.deleteUserByName(name)
    }
}

exports.Admin = Admin;