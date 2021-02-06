let fsCb = require('fs');

function readDirectories(dir) {
    let dirsAndFiles = read(dir);
    let result = {};
    makeObject(dir, dirsAndFiles);

    function read(dir) {
        return fsCb.readdirSync(dir);
    }

    function makeObject(directory, strings) {
        let res = {};
        for (let item of strings) {
            let extension = item.split('.')[1];
            if (extension === 'txt' || extension === 'js') {
                res[item] = true;
            } else {
                let nextDirectory = `${directory}/${item}`;
                let dirsAndFiles = read(nextDirectory);
                res[item] = makeObject(nextDirectory, dirsAndFiles);
            }
        }
        result = res;
        return result;
    }

    return result;
}

let readDirectoriesObj = readDirectories(__dirname);
console.log(readDirectoriesObj);
