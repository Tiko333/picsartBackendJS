function promisify(callback) {
    return (...callbackArgs) => new Promise((resolve, reject) => {
        const cb = (err, ...result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result.length === 1 ? result[0] : result);
            }
        };

        callbackArgs.push(cb);
        callback(...callbackArgs);
    });
}

function promisify2(func, ...args) {
    return new Promise((resolve, reject) => {
        func(...args, function (err, ...res) {
            if (err) {
                return reject(err);
            } else {
                return resolve(res);
            }
        })
    })
}