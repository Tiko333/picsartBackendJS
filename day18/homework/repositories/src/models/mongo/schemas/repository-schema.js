const mongoose = require('mongoose');

const RepositorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    node_id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    full_name: {
        type: String
    },
    private: {
        type: Boolean
    },
    owner: {
        type: Object
    },
    html_url: {
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    pushed_at: {
        type: Date
    },
    git_url: {
        type: String
    },
    ssh_url: {
        type: String
    },
    clone_url: {
        type: String
    },
    svn_url: {
        type: String
    },
    homepage: {
        type: String
    },
    size: {
        type: Number
    },
    stargazers_count: {
        type: Number
    },
    watchers_count: {
        type: Number
    },
    language: {
        type: String
    },
    default_branch: {
        type: String
    }
});

exports.model = mongoose.model('repositories', RepositorySchema);