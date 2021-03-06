Promise.all = function (promises) {
    let result = [];

    function checkAndResolve(resolve) {
        if (result.length === promises.length) {
            resolve(result)
        }
    }

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            if (promises[i] instanceof Promise) {
                promises[i].then(
                    message => {
                        result.push(message);
                        checkAndResolve(resolve);
                    }
                ).catch(err => {
                    reject(err)
                })
            } else {
                result.push(promises[i]);
                checkAndResolve(resolve);
            }
        }
    })
}

Promise.each = function (input, iterator) {
    let result = [];

    function checkAndResolve(resolve) {
        if (result.length === input.length) {
            resolve(result);
        }
    }

    function execute(resolve, reject) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] instanceof Promise) {
                input[i].then(msg => {
                    iterator(msg, i, input.length);
                    result.push(msg);
                    checkAndResolve(resolve);
                }).catch(err => reject(err))
            } else {
                iterator(input[i], i, input.length);
                result.push(input[i]);
                checkAndResolve(resolve);
            }
        }
    }

    return new Promise((resolve, reject) => {
        if (input instanceof Promise) {
            input.then(res => {
                input = [];
                res.forEach(item => input.push(item))
            }).then(() => {
                execute(resolve, reject);
            })
        } else {
            execute(resolve, reject);
        }
    })
}

Promise.race = promises => new Promise(((resolve, reject) => {
    let isFinished = false;

    for (let item of promises) {
        item.then(msg => {
            if (isFinished) {
                return;
            }
            isFinished = true;
            resolve(msg);
        }).catch(err => {
            if (isFinished) {
                return ;
            }
            isFinished = true;
            reject(err);
        })
    }
}))

Promise.allSettled = promises => {
    let result = [];

    function checkAndResolve(resolve) {
        if (result.length === promises.length) {
            resolve(result);
        }
    }

    return new Promise(((resolve) => {
        for (let item of promises) {
            if (item instanceof Promise) {
                item.then(msg => {
                    result.push({
                        status: 'fulfilled',
                        value: msg,
                    });
                    checkAndResolve(resolve);
                }).catch(err => {
                    result.push({
                        status: 'rejected',
                        value: 'Error: an error'
                    });
                    checkAndResolve(resolve);
                })
            } else {
                result.push({
                    status: 'fulfilled',
                    value: item
                });
                checkAndResolve(resolve);
            }
        }
    }))
}

Promise.any = function (promises) {
    let errors = [];
    let isCompleted = false;

    return new Promise((resolve) => {
        for (let i = 0; i < promises.length; i++) {
            if (promises[i] instanceof Promise) {
                promises[i].then(msg => {
                    if (isCompleted) {
                        return;
                    }
                    isCompleted = true;
                    resolve(msg);
                }).catch(err => {
                    errors.push(err);
                    if (i === promises.length - 1) {
                        resolve(errors)
                    }
                })
            }
        }
    })
}