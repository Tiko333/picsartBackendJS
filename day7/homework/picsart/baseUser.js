function BaseUser(name, age) {
    this.name = name;
    this.age = age;
}

BaseUser.prototype.print = function () {
    return `Profile Name: ${this.name} \nProfile Age: ${this.age}`;
}