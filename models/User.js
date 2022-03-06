const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const postschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error('Name must contain character only!');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 15
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 150,
        validate(value) {
            if (!validator.isInt(value)) {
                throw new Error("Age should be integer only");
            }
        }
    }
});
//hashing password before saving it to DB
postschema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
// postschema.pre('findOneAndUpdate', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

module.exports = mongoose.model('User', postschema);