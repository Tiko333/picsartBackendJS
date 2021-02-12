function Post(picture, postText) {
    this.picture = picture;
    this.postText = postText;
}

Post.prototype.printPost = function () {
    console.log(this.picture, this.postText);
}

Post.prototype.getPicture = function () {
    return this.picture.getPicture();
}

Post.prototype.getText = function () {
    return this.postText;
}