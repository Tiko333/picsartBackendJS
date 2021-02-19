function UrlParser() {

}

UrlParser.prototype.getParameters = function (url) {
    let result = {};
    let isId = false;
    let params = url.slice(url.lastIndexOf('?') + 1);
    let strings = params.split('&');
    for (const string of strings) {
        let keyValue = string.split('=');
        let key = keyValue[0];
        let value = keyValue[1];
        if (key === 'id') {
            if (!isId) {
                value = +value;
                isId = true;
                result[key] = value;
            }
            continue;
        }

        result[key] = value;
    }

    return result;
}

exports.UrlParser = UrlParser;