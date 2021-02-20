const http = require('http');
const {UrlParser} = require("../service/urlParser");
const {UserService} = require("../service/userService");

function Server() {
    this.userService = new UserService();
    this.urlParser = new UrlParser();
    this.port = 3000;
    this.findByIdRegExp = new RegExp("\/users\/[0-9]+$");
    this.searchRegExp = new RegExp("\/users\/[a-zA-Z]+$");
    this.updateRegExp = new RegExp("\/users\/[0-9]+[?][a-zA-Z=0-9&]+$");
}

Server.prototype.start = function () {

    http.createServer((req, res) => {
            let requestMethod = req.method;

            if (requestMethod === 'POST') {
                if (req.url === '/users') {
                    res.statusCode = 201;
                    createUser.call(this, req, res);
                }
            }

            if (requestMethod === 'GET') {
                res.statusCode = 200;
                if (req.url === '/users') {
                    getAllUsers.call(this, res);
                }
                if (this.findByIdRegExp.test(req.url)) {
                    let id = +req.url.slice(req.url.lastIndexOf('/') + 1);
                    getUserById.call(this, req, res, id);
                }
                if (this.searchRegExp.test(req.url)) {
                    let search = req.url.slice(req.url.lastIndexOf('/') + 1);
                    findByFirstname.call(this, res, search);
                }
            }

            if (requestMethod === 'PUT') {
                if (this.updateRegExp.test(req.url)) {
                    let parameters = this.urlParser.getParameters(req.url);
                    res.statusCode = 200;
                    updateById.call(this, parameters, res);
                }
            }

            if (requestMethod === 'DELETE') {
                if (this.findByIdRegExp.test(req.url)) {
                    let id = +req.url.slice(req.url.lastIndexOf('/') + 1);
                    res.statusCode = 204;
                    deleteUserById.call(this, id, res);
                }
            }

            if (res.finished === false) {
                res.statusCode = 404;
                res.end('404');
            }
        }
    ).listen(this.port);

    function createUser(req, res) {
        req.on('data', (data) => {
            this.userService.createUser(JSON.parse(data.toString()));
            res.end();
        })
    }

    function getAllUsers(res) {
        res.end(JSON.stringify(this.userService.getAllUsers()));
    }

    function getUserById(req, res, id) {
        let userById = this.userService.getUserById(id);
        res.end(JSON.stringify(userById));
    }

    function findByFirstname(res, search) {
        let findByFirstname = this.userService.findByFirstname(search);
        res.end(JSON.stringify(findByFirstname));
    }

    function updateById(parameters, res) {
        let updateUserById = this.userService.updateUserById(parameters);
        res.end(JSON.stringify(updateUserById));
    }

    function deleteUserById(id, res) {
        this.userService.deleteUserById(id);
        res.end();
    }

    console.log(`Server running on port ${this.port}`);
}

new Server().start();