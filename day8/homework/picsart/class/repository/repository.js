class Repository {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsersByName(name) {
        let results = [];
        this.users.forEach(user => {
            if (user.getName() === name) {
                results.push(user);
            }
        });

        return results;
    }

    getUsersByAge(age) {
        let results = [];
        this.users.forEach(user => {
            if (user.getAge() === age) {
                results.push(user);
            }
        });

        return results;
    }

    getAllUsers() {
        return this.users;
    }

    deleteUserByName(name) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === name) {
                this.users.splice(i, 1);
                break;
            }
        }
    }
}

exports.Repository = Repository;