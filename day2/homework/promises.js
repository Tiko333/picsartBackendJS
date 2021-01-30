Promise.all = function (promises) {
    let result = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            if (promises[i] instanceof Promise) {
                promises[i].then(
                    message => {
                        result.push(message);
                        if (result.length === promises.length) {
                            resolve(result)
                        }
                    }
                ).catch((err) => reject(err))
            } else {
                result.push(promises[i]);
                if (result.length === promises.length) {
                    resolve(result);
                }
            }
        }
    })
}

Promise.each = function (input, iterator) {
    let result = [];

    function execute(resolve, reject) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] instanceof Promise) {
                input[i].then(msg => {
                    iterator(msg, i, input.length);
                    result.push(msg);
                    if (result.length === input.length) {
                        resolve(result);
                    }
                }).catch(err => reject(err))
            } else {
                iterator(input[i], i, input.length);
                result.push(input[i]);
                if (result.length === input.length) {
                    resolve(result);
                }
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