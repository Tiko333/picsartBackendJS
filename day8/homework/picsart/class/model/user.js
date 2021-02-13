let {Video} = require("./video");
let {BaseUser} = require('./baseUser');
let {Post} = require('./post');
let {Picture} = require('./picture');

class User extends BaseUser {
    constructor(name, age, picture) {
        super(name, age);
        this.accountType = 'user';
        this.picture = picture;
        this.posts = [];
        this.videos = [];
    }

    addPost(picture, text) {
        this.posts.push(new Post(picture, text));
    }

    getPosts() {
        let postsResult = '';
        for (let i = 0; i < this.posts.length; i++) {
            postsResult += '\n ' + this.posts[i].toString();
        }
        return postsResult;
    }

    addVideo(video) {
        this.videos.push(video);
    }

    getVideos() {
        let videosResult = '';
        for (let i = 0; i < this.videos.length; i++) {
            videosResult += '\n ' +this.videos[i].toString();
        }
        return videosResult;
    }

    playVideo(name) {
        for (let item of this.videos) {
            if (item.getName().split('.')[0] === name) {
                item.play();
                break;
            }
        }
    }

    toString() {
        let nameAge = super.toString.call(this);
        let posts = this.getPosts();
        let videos = this.getVideos();

        return `${nameAge} 
Account Type: ${this.accountType}
Profile Picture: ${this.picture}
Videos: ${videos}
Posts: ${posts}`;
    }
}

exports.User = User;