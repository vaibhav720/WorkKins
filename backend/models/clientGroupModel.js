const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const clientGroupSchema = mongoose.Schema({

    groupName: {
        type: String,
        required: [true, 'Please enter name.'],
    },

    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Password should be atleast 6 characters.'],
        select: false,
    },

    emailList: [{
        type: String,
        required: [true, 'Please enter Email ID'],
        
        validate: [validator.isEmail, 'Please enter valid Email'],
    }],
    


    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

// encrypting the password
clientGroupSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// getting the jwt token based on id for serialization
clientGroupSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

// compare password
clientGroupSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};

// generating reset password token
clientGroupSchema.methods.getResetPasswordToken = function () {

    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding to schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('ClientGroup', clientGroupSchema);