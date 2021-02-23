function validate(user) {
    if (!user.id) {
        return Error('id is not specified');
    }
    if (!user.firstname) {
        return Error('firstname is not specified');
    }
    if (!user.lastname) {
        return Error('lastname is not specified');
    }
    if (!user.email) {
        return Error('email is not specified');
    }
    if (!user.pass) {
        return Error('pass is not specified');
    }
}

module.exports = validate