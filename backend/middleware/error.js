const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // wrong mongodb ID error
    if (err.name === 'castError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong Jwt token
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // Jwt expire
    if (err.name === 'TokenExpiredError') {
        const message = `Json web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};