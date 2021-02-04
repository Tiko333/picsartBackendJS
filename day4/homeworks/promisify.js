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