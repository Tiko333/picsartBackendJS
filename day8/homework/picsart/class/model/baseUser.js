class BaseUser  {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `Profile Name: ${this.name} 
Profile Age: ${this.age}`;
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }
}

exports.BaseUser = BaseUser;