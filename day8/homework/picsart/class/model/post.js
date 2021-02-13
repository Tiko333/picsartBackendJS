class Post {
    constructor(picture, postText) {
        this.picture = picture;
        this.description = postText;
    }

    toString() {
        return `Picture: ${this.picture.toString()} 
 Description: ${this.description}
 `;
    }

    getDescription() {
        return this.description;
    }

    getPicture() {
        return this.picture.getPicture();
    }
}

exports.Post = Post