function Video(name, ext) {
    this.name = name;
    this.ext = ext;
}

Video.prototype.play = function () {
    console.log(`Playing video: ${this.name}.${this.ext}`);
}

Video.prototype.print = function () {
    console.log(`${this.name}.${this.ext}`);
}

Video.prototype.getName = function () {
    return `${this.name}.${this.ext}`;
}