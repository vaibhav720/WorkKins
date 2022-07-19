const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Client = require('../models/clientModel');
const sendToken = require('../utils/getToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');

// Client Sign UP
const clientSignUp = catchAsyncErrors(async (req, res, next) => {

    const clientModel = req.body;

    const client = await Client.create(clientModel);

    sendToken(client, 201, res);
});


// Client Login
const clientLogin = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // parameters not provided
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    const client = await Client.findOne({ email }).select("+password");

    // client not found
    if (!client) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatching = await client.comparePassword(password);

    if (!isPasswordMatching) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(client, 200, res);
});


// get Client Details
const getClientDetails = catchAsyncErrors(async (req, res, next) => {

    const clientID = req.clientID;

    const client = await Client.findById(clientID);

    res.status(200).json({
        success: true,
        client,
    });
});


// update Client Details
const editClientDetails = catchAsyncErrors(async (req, res, next) => {
    const clientID = req.clientID;

    const client = await Client.findByIdAndUpdate({ _id: clientID }, req.body, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        client,
    });
});


// Client forgot password
const clientForgotPassword = catchAsyncErrors(async (req, res, next) => {

    const client = await Client.findOne({ email: req.body.email });

    if (!client) {
        return next(new ErrorHandler("User not found", 404));
    }

    // get resetPassword token
    const resetPasswordToken = client.getResetPasswordToken();

    await client.save({ validateBeforeSave: false });

    // url for resetting the password
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/client/auth/resetPassword/${resetPasswordToken}`;

    // message which we want to display to user
    const message = `Your password reset link is :- \n\n  ${resetPasswordUrl} \n\n If you have not requested this email then, kindly ignore it.`;

    try {

        // object for sending the email
        await sendEmail({
            email: req.body.email,
            subject: `Workkins Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${client.email} successfully`,
        });

    } catch (error) {

        // unsave the client as email was not sent successfully
        client.resetPasswordToken = undefined;
        client.resetPasswordExpire = undefined;
        await client.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

});


// reset password
const clientResetPassword = catchAsyncErrors(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const client = await Client.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!client) {
        return next(new ErrorHandler("Reset Password token is Invalid or has expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    client.password = req.body.password;
    client.resetPasswordExpire = undefined;
    client.resetPasswordToken = undefined;

    await client.save({ validateBeforeSave: true });

    sendToken(client, 200, res);

});


// update password
const clientUpdatePassword = catchAsyncErrors(async (req, res, next) => {



});


// Client Logout
const clientLogout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logout successfull",
    });
});

module.exports = { clientSignUp, clientLogin, clientLogout, getClientDetails, editClientDetails, clientForgotPassword, clientResetPassword };