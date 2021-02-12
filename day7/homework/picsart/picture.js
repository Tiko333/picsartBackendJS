function Picture(name, ext) {
    this.name = name;
    this.ext = ext;
}

Picture.prototype.getPicture = function () {
    return `${this.name}.${this.ext}`;
}