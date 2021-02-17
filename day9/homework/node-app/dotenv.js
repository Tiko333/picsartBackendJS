let fs = require('fs');

function config() {
    let configFile = fs.readFileSync('.env').toString();
    let split = configFile.split('\n');
    split.forEach(line => {
        let lineSplit = line.split('=');
        let key = lineSplit[0];
        let value;
        if (lineSplit.length > 2) {
            value = lineSplit.slice(1).join('=');
        } else {
            value = lineSplit[1];
        }
        if (key === '') {
            return;
        }
        if (key.startsWith("#")) {
            return;
        }

        process.env[key] = value;
    });
}

exports.config = config;