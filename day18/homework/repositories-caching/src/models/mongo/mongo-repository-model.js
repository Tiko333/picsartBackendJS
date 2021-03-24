const {model} = require('./schemas/repository-schema.js');
const axios = require('axios');
const random = require('random-words');
const redis = require('redis');
const publisher = redis.createClient();

// saves repositories into mongoDB and publishing 'repositories'
exports.saveRepos = async function (mappedRepos) {
    const documentPromise = await model.create(mappedRepos);
    console.log('added repositories to mongoDB');
    publisher.publish('repositories', `${documentPromise.length}`);
    publisher.publish('saveRepos', `${documentPromise.length}`);
}

// gets repositories from GitHub API by using Axios
exports.getReposFromGitHub = async function () {
    const repos = await axios.get(`${process.env.GITHUB_URL}${random(1)}`);
    return repos;
}

// processing repositories
exports.processRepos = function (repos) {
    const mappedRepos = repos.data.items.slice(0, 5).map(item => {
        return {
            id: item.id,
            node_id: item.node_id === null ? '': item.node_id,
            name: item.name === null ? '': item.name,
            full_name: item.full_name === null ? '': item.full_name,
            private: item.private,
            owner: item.owner === null ? '': item.owner,
            html_url: item.html_url === null ? '': item.html_url,
            description: item.description === null ? '': item.description,
            url: item.url === null ? '': item.url,
            created_at: item.created_at,
            updated_at: item.updated_at,
            pushed_at: item.pushed_at,
            git_url: item.git_url === null ? '': item.git_url,
            ssh_url: item.ssh_url === null ? '': item.ssh_url,
            clone_url: item.clone_url === null ? '': item.clone_url,
            svn_url: item.svn_url === null ? '': item.svn_url,
            homepage: item.homepage === null ? '': item.homepage,
            size: item.size,
            stargazers_count: item.stargazers_count,
            watchers_count: item.watchers_count,
            language: item.language === null ? '': item.language,
            default_branch: item.default_branch === null ? '': item.default_branch,
        }
    });

    return mappedRepos;
}

// gets repositories count from MongoDB
exports.getReposCount = async function () {
    const count = await model.countDocuments();
    return count;
}

// gets repositories from MongoDB
exports.getRepos = async function () {
    const repositories = await model.find();
    return repositories;
}