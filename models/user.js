const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    proImage: {
        type: String,
        require: false

    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unicode: true
    },
    phoneNumber: {
        type: String,
        require: true,
        minlength: 11,
        maxlength: 11,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: 2
    }


});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.presto_jwtPrivateKey);
    return token;
};
userSchema.methods.getSchemaKeys = function () {
    var paths=[];
    userSchema.eachPath(function (path) {
        paths.push(path)
    });
    return paths;

};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}


async function getAllUserCount() {

    const allUsersCount = await User.countDocuments({});
    const activeUsersCount = await User.countDocuments({isActivated: true});
    const pendingUsersCount = await User.countDocuments({isActivated: false});
    const premiumUsersCount = await User.countDocuments({});

    return {
        'allUsersCount': allUsersCount,
        'activeUsersCount': activeUsersCount,
        'pendingUsersCount': pendingUsersCount,
        'premiumUsersCount': premiumUsersCount
    }
}


exports.User = User;
exports.validateUser = validateUser;
exports.getAllUserCount = getAllUserCount;

