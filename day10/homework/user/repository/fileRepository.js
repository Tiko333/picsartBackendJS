const fs = require('fs');

function FileRepository() {
    this.path = '../fileDataBase/users';
}

FileRepository.prototype.create = function (user) {
    let userText = `${JSON.stringify(user)}
`;
    fs.appendFile(this.path, userText, (err) => {
        console.log(err ? err : 'user created');
    });
}

FileRepository.prototype.getAllUsers = function () {
    let users = [];
    let usersText = fs.readFileSync(this.path).toString();
    let strings = usersText.split('\n');
    strings.forEach(userJson => {
        if (userJson !== '') {
            let parse = JSON.parse(userJson);
            users.push(parse);
        }
    })
    return users;
}

FileRepository.prototype.getUserById = function (id) {
    let usersText = fs.readFileSync(this.path).toString();
    let strings = usersText.split('\n');
    for (const userJson of strings) {
        if (userJson !== '') {
            let currentId = userJson.slice(userJson.indexOf(':') + 2, userJson.indexOf(',') - 1);

            if (+currentId === id) {
                return JSON.parse(userJson);
            }
        }
    }
}

FileRepository.prototype.findByFirstname = function (firstname) {
    let users = [];
    let usersText = fs.readFileSync(this.path).toString();
    let strings = usersText.split('\n');
    for (const userJson of strings) {
        if (userJson !== '') {
            if (this.isFirstnameContains(userJson, firstname)) {
                users.push(JSON.parse(userJson));
            }
        }
    }

    return users;
}

FileRepository.prototype.updateUserById = function (parameters) {
    let userById = this.getUserById(parameters.id);

    for (let parametersKey in parameters) {
        if (parametersKey === 'id') {
            continue;
        }
        userById[parametersKey] = parameters[parametersKey];
    }

    let usersText1 = fs.readFileSync(this.path).toString();
    let strings = usersText1.split('\n');
    let res = '';
    for (const string of strings) {
        let currentId = +string.slice(string.indexOf(':') + 2, 8);
        if (currentId === parameters.id) {
            let removedUsersText1 = usersText1.replace(string, JSON.stringify(userById));
            let removedUsersText1Split = removedUsersText1.split('\n');
            for (let string1 of removedUsersText1Split) {
                if (string1.length !== 0) {
                    res += string1 + '\n';
                }
            }
            break;
        }
    }
    fs.writeFile(this.path, res, (err) => {
        console.log(err ? err : 'user updated');
    });
}

FileRepository.prototype.deleteUserById = function (id) {
    let usersText = fs.readFileSync(this.path).toString();
    let strings = usersText.split('\n');
    let res = '';
    for (const string of strings) {
        let currentId = +string.slice(string.indexOf(':') + 2, 8);
        if (currentId === id) {
            let userRemovedUsersText = usersText.replace(string, '');
            let userRemovedUsersTextSplit = userRemovedUsersText.split('\n');
            for (let string1 of userRemovedUsersTextSplit) {
                if (string1.length !== 0) {
                    res += string1 + '\n';
                }
            }
            break;
        }
    }

    fs.writeFile(this.path, res, (err) => {
        console.log(err ? err : 'user deleted');
    });
}

FileRepository.prototype.isFirstnameContains = function (string, field) {
    if (string[0] === '{') {
        string = string.slice(1, string.length - 1);
    }
    let split = string.split(',');
    for (const splitElement of split) {
        let key = splitElement.slice(1, splitElement.indexOf(':') - 1);
        let value = splitElement.slice(splitElement.indexOf(':') + 2, splitElement.length - 1);
        if (key === 'firstname') {
            return value.includes(field);
        }

    }

    return false;
}

exports.FileRepository = FileRepository;