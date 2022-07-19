const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const adminSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter name.'],
    },

    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Password should be atleast 6 characters.'],
        select: false,
    },

    email: {
        type: String,
        required: [true, 'Please enter Email ID'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid Email'],
    },

    mobile: {
        type: Number,
        required: [true, 'Please enter Mobile No.'],
    },

    gender: {
        type: String,
        required: [true, 'Please enter gender'],
    },

    birthdate: {
        type: Date,
        required: [true, 'Please enter date of birth'],
    },


    address: {
        type: String,
        required: [true, 'Please enter address'],
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

// encrypting the password
adminSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// getting the jwt token based on id for serialization
adminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

// compare password
adminSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};

// generating reset password token
adminSchema.methods.getResetPasswordToken = function () {

    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding to schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('Admin', adminSchema);