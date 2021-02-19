const http = require('http');
const {UrlParser} = require("../service/urlParser");
const {UserService} = require("../service/userService");

function Server() {
    this.userService = new UserService();
    this.urlParser = new UrlParser();
    this.port = 3000;
}

Server.prototype.start = function () {

    http.createServer((req, res) => {
            let requestMethod = req.method;
            let parameters = this.urlParser.getParameters(req.url);

            if (requestMethod === 'POST') {
                res.statusCode = 201;
                if (req.url === '/create') {
                    createUser.call(this, req, res);
                }
            }

            if (requestMethod === 'GET') {
                res.statusCode = 200;
                if (req.url === '/users') {
                    getAllUsers.call(this, res);
                }

                let urlWithoutParams = req.url.slice(0, req.url.indexOf('?'));
                if (urlWithoutParams === '/getById' && parameters.id !== undefined) {
                    getUserById.call(this, req, res, parameters.id);
                }
                if (urlWithoutParams === '/search' && parameters.firstname !== undefined) {
                    findByFirstname.call(this, res, parameters);
                }
            }

            if (requestMethod === 'PUT') {
                res.statusCode = 200;
                let urlWithoutParams = req.url.slice(0, req.url.indexOf('?'));
                if (urlWithoutParams === '/update') {
                    updateById.call(this, parameters, res);
                }
            }

            if (requestMethod === 'DELETE') {
                res.statusCode = 204;
                let urlWithoutParams = req.url.slice(0, req.url.indexOf('?'));
                if (urlWithoutParams === '/delete') {
                    deleteUserById.call(this, parameters, res);
                }
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

    function findByFirstname(res, parameters) {
        let findByFirstname = this.userService.findByFirstname(parameters.firstname);
        res.end(JSON.stringify(findByFirstname));
    }

    function updateById(parameters, res) {
        let updateUserById = this.userService.updateUserById(parameters);
        res.end(JSON.stringify(updateUserById));
    }

    function deleteUserById(parameters, res) {
        this.userService.deleteUserById(parameters.id);
        res.end();
    }

    console.log(`Server running on port ${this.port}`);
}

new Server().start();