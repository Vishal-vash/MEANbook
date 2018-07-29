const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 4},
    username: {type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3},
    password: {type: String, required: true, trim: true, minlength: 4}
})

const User = mongoose.model('User', UserSchema);

const ValidateUser = (user) => {
    const Schema = {
        email: Joi.string().trim().email().min(4).required(),
        username: Joi.string().trim().min(3).required(),
        password: Joi.string().trim().min(4).required()
    }

    return Joi.validate(user, Schema);
}

exports.User = User;
exports.ValidateUser = ValidateUser;