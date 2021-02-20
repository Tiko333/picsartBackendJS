const express = require('express');
const {UserService} = require("../service/userService");
const app = express();

const port = 3000;
const userService = new UserService();

app.use(express.json());

app.get('/users', (req, res) => {
    res.status(200).json(userService.getAllUsers());
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json(userService.getUserById(+id));
});

app.get('/users/search/:search', (req, res) => {
    const {search} = req.params;
    res.status(200).json(userService.findByFirstname(search));
});

app.post('/users', ((req, res) => {
    userService.createUser(req.body);
    res.status(201).end();
}));

app.put('/users/:id/firstname=:firstname&lastname=:lastname&pass=:password', (req, res) => {
    const parameters = req.params;
    userService.updateUserById(parameters);
    res.status(200).end();
});

app.delete('/users/:id', ((req, res) => {
    const {id} = req.params;
    userService.deleteUserById(+id);
    res.status(204).end();
}));

app.use((req, res) => {
    console.error('Wrong url path');
    res.status(400).send('Wrong url path!');
})

app.listen(port, () => {
    console.log(`User app listening at http://lockahost:${port}`);
});