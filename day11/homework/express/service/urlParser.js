function UrlParser() {

}

UrlParser.prototype.getParameters = function (url) {
    let result = {};
    let isId = false;
    let params = url.slice(url.lastIndexOf('/') + 1);
    result.id = +params[0];
    let strings = params.slice(2).split('&');
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