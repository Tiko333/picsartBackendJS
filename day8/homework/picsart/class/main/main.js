const {Video} = require("../model/video");
const {Picture} = require("../model/picture");
const {UserService} = require("../service/userService");

let userService = new UserService();
init(userService);


let allUsers = userService.getAllUsers();
let usersByAge = userService.getUsersByAge(20);
let usersByName = userService.getUsersByName();

let admin = userService.createAdmin('Tony', 33);
admin.deleteUserByName('John');
let users = admin.getUsers();
console.log(users);

function init(userService) {
    let user1 = userService.createUser('John', 24, new Picture('John', 'jpeg'));
    user1.addPost(new Picture('firstPostJohn', 'svg'), 'John\'s first post');
    user1.addPost(new Picture('secondPostJohn', 'jpg'), 'John\'s second post');
    user1.addVideo(new Video('firstVideoJohn', 'mp4'));
    user1.addVideo(new Video('secondVideoJohn', 'mp4'));

    let user2 = userService.createUser('Anna', 20, new Picture('Anna', 'jpeg'));
    user2.addPost(new Picture('firstPostAnna', 'svg'), 'Anna\'s first post');
    user2.addPost(new Picture('secondPostAnna', 'jpg'), 'Anna\'s second post');
    user2.addVideo(new Video('firstVideoAnna', 'mp4'));
    user2.addVideo(new Video('secondVideoAnna', 'mp4'));

    let user3 = userService.createUser('Ani', 20, new Picture('Ani', 'jpeg'));
    user3.addPost(new Picture('firstPostAni', 'svg'), 'Ani\'s first post');
    user3.addPost(new Picture('secondPostAni', 'jpg'), 'Ani\'s second post');
    user3.addVideo(new Video('firstVideoAni', 'mp4'));
    user3.addVideo(new Video('secondVideoAnia', 'mp4'));
}