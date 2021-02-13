class Picture {
    constructor(name, ext) {
        this.name = name;
        this.ext = ext;
    }

    toString() {
        return `${this.name}.${this.ext}`;
    }
}

exports.Picture = Picture;