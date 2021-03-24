const fs = require('fs').promises;
const {contentTypes} = require('../utils/contentTypes');

// sending a response with file to the client
exports.static = function (path) {
    return function (req, res) {
        const filePath = path + req.path;
        fs.readFile(filePath).then(data => {
            const fileExt = req.path.slice(req.path.lastIndexOf('.') + 1);
            res.setHeader('Content-Type', contentTypes[fileExt]);
            res.write(data);
            res.end();
        }).catch(() => {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: `no file by path ${filePath}`
            });
        });
    }
}