class Video {
    constructor(name, ext) {
        this.name = name;
        this.ext = ext;
    }

    play() {
        console.log(`Playing video: ${this.name}.${this.ext}`);
    }

    toString() {
        return `${this.name}.${this.ext}`;
    }
}

exports.Video = Video;