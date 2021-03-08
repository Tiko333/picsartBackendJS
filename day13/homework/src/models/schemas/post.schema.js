const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    author: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: String,
        required: false
    },
    likes: {
        type: Object,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Posts', PostSchema);