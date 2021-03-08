const User = require('./schemas/user.schema');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const postsDb = require('../models/posts.model');
const fs = require('fs');

const register = async (user, photo) => {
    let hashedPass = bcryptjs.hashSync(user.password, 10);

    let newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPass,
    });
    if (photo) {
        newUser.avatar = photo.path.slice(photo.path.indexOf('/'));
    }
    const savedUser = await newUser.save();
    let token = jsonwebtoken.sign({id: savedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
    if (savedUser !== null) {
        savedUser.token = token;
    }

    return savedUser;
}

const login = async (user) => {
    let email = user.email;
    let password = user.password;

    let userByEmail = await User.findOne({email: email});

    if (userByEmail) {
        let result = bcryptjs.compareSync(password, userByEmail.password);
        if (result) {
            userByEmail.token = jsonwebtoken.sign({id: userByEmail._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            return userByEmail;
        } else {
            return {
                error: 'wrong password'
            }
        }
    }
}

const getAll = async () => {
    const users = await User.find();
    return users;
}

const getById = async (id) => {
    const user = await User.findById(id);
    return user;
}

const getByName = async (search) => {
    let usersByName = await User.find({name: {$regex: search, $options: 'i'}});
    return usersByName;
}

const updateById = async (user) => {
    let hashedPass = bcryptjs.hashSync(user.password, 10);
    const updatedUser = await User.updateOne(
        {_id: user.id},
        {
            $set: {
                name: user.name,
                password: hashedPass
            }
        }
    );

    let updatedPostAuthor = await postsDb.updatePostAuthor(user);

    return {
        updatedUser,
        updatedPostAuthor
    };
}

const deleteById = async (req) => {
    const user = await User.findById(req.params.id);
    let result = {};
    if (user && user._id == req.user.id) {
        let removedUser = await User.deleteOne({_id: req.params.id});
        if (removedUser.deletedCount > 0) {
            try {
                fs.unlinkSync(`src/${user.avatar}`);
            } catch (err) {
                console.error(err)
            }
            result.isDeleted = true;
            return result;
        }
    }
    if (user) {
        result.isOtherUser = true;
        return result;
    } else {
        result.isUserNotExisting = true;
        return result;
    }
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({email: email});
    return user;
}


module.exports = {
    register,
    login,
    getAll,
    getById,
    getByName,
    updateById,
    deleteById,
    getUserByEmail,
}