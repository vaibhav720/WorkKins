const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Client = require('../models/clientModel');

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    next();
});

function isAuthRole(isAdmin) {
    return async (req, res, next) => {

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const givenId = decodedData.id;

        if (isAdmin) {
            const admin = await Admin.findById(givenId);

            if (!admin) {
                return next(new ErrorHandler("User doesn't have permission to access the resource.", 401));
            } else {
                req.adminId = givenId;
                next();
            }

        } else {
            const client = await Client.findById(givenId);

            if (!client) {
                return next(new ErrorHandler("User doesn't have permission to access the resource.", 401));
            } else {
                req.enrollment = client.enrollment;
                next();
            }
        }
    }
}

module.exports = { isAuthenticated, isAuthRole };