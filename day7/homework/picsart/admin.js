function Admin(name, age, users) {
    BaseUser.call(this, name, age);
    this.accountType = 'admin';
    this.users = users;
}

Admin.prototype = Object.create(BaseUser.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.print = function () {
    let nameAge = BaseUser.prototype.print.call(this);
    console.log(`${nameAge} \nAccount Type: ${this.accountType}`)
}

Admin.prototype.printUsers = function () {
    console.log('Users: ')
    for (let i = 0; i < this.users.length; i++) {
        console.log(this.users[i])
    }
}