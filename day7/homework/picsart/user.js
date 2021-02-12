function User(name, age, picture) {
    BaseUser.call(this, name, age);
    this.accountType = 'user';
    this.picture = picture;
    this.posts = [];
    this.videos = [];
}

User.prototype = Object.create(BaseUser.prototype);
User.prototype.constructor = User;

User.prototype.addPost = function (picture, text) {
    this.posts.push(new Post(picture, text));
}

User.prototype.printPosts = function () {
    for (let i = 0; i < this.posts.length; i++) {
        console.log(`\nPicture: \n${this.posts[i].getPicture()} \n\nDescription: ${this.posts[i].getText()}`)
    }
}

User.prototype.print = function () {
    let nameAge = BaseUser.prototype.print.call(this);
    let postsString = '';
    let videosString = '';
    if (this.posts.length > 0) {
        this.posts.forEach(pop => {
            if (postsString.length !== 0) {
                postsString += `\n Picture: ${pop.getPicture()} \n Description: ${pop.getText()}`;
            } else {
                postsString += ` Picture: ${pop.getPicture()} \n Description: ${pop.getText()}`;
            }
        });
    }
    if (this.videos.length > 0) {
        this.videos.forEach(video => {
            videosString += `\n Video: ${video.getName()}`;
        })
    }

    console.log(`\n${nameAge} \nAccount Type: ${this.accountType} \nProfile Picture: ${this.picture.getPicture()}   \nVideos: ${videosString} \nPosts: \n${postsString}`)
}

User.prototype.addVideo = function (video) {
    this.videos.push(video);
}

User.prototype.printVideos = function () {
    this.videos.forEach(item => {
        item.print();
    });
}

User.prototype.playVideo = function (name) {
    for (let i = 0; i < this.videos.length; i++) {
        if (this.videos[i].getName().split('.')[0] === name) {
            this.videos[i].play();
            break;
        }
    }
}
