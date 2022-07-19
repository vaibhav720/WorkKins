const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Admin = require('../models/adminModel');
const sendToken = require('../utils/getToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');

// Admin Sign UP
const adminSignUp = catchAsyncErrors(async (req, res, next) => {

    const adminModel = req.body;

    const admin = await Admin.create(adminModel);

    sendToken(admin, 201, res);
});


// Admin Login
const adminLogin = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // parameters not provided
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");

    // admin not found
    if (!admin) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatching = await admin.comparePassword(password);

    if (!isPasswordMatching) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(admin, 200, res);
});


// get Admin Details
const getAdminDetails = catchAsyncErrors(async (req, res, next) => {

    const adminID = req.adminID;

    const admin = await Admin.findById(adminID);

    res.status(200).json({
        success: true,
        admin,
    });
});


// update Admin Details
const editAdminDetails = catchAsyncErrors(async (req, res, next) => {
    const adminID = req.adminID;

    const admin = await Admin.findByIdAndUpdate({ _id: adminID }, req.body, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        admin,
    });
});


// Admin forgot password
const adminForgotPassword = catchAsyncErrors(async (req, res, next) => {

    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
        return next(new ErrorHandler("User not found", 404));
    }

    // get resetPassword token
    const resetPasswordToken = admin.getResetPasswordToken();

    await admin.save({ validateBeforeSave: false });

    // url for resetting the password
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/admin/auth/resetPassword/${resetPasswordToken}`;

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
            message: `Email sent to ${admin.email} successfully`,
        });

    } catch (error) {

        // unsave the admin as email was not sent successfully
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

});


// reset password
const adminResetPassword = catchAsyncErrors(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const admin = await Admin.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
        return next(new ErrorHandler("Reset Password token is Invalid or has expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    admin.password = req.body.password;
    admin.resetPasswordExpire = undefined;
    admin.resetPasswordToken = undefined;

    await admin.save({ validateBeforeSave: true });

    sendToken(admin, 200, res);

});


// update password
const adminUpdatePassword = catchAsyncErrors(async (req, res, next) => {



});


// Admin Logout
const adminLogout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logout successfull",
    });
});

module.exports = { adminSignUp, adminLogin, adminLogout, getAdminDetails, editAdminDetails, adminForgotPassword, adminResetPassword };