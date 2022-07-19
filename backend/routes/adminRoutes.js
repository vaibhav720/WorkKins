const express = require('express');
const { isAuthenticated, isAuthRole } = require('../middleware/auth');
const { adminSignUp, adminLogin, adminLogout, getAdminDetails, adminForgotPassword, editAdminDetails, adminResetPassword } = require('../controller/adminController');

const router = express.Router();

router.route('/auth/signup').post(adminSignUp);
router.route('/auth/login').post(adminLogin);
router.route('/profile').get(isAuthenticated, isAuthRole(true), getAdminDetails);
router.route('/editProfile').patch(isAuthenticated,isAuthRole(true), editAdminDetails);
router.route('/auth/forgotPassword').post(adminForgotPassword);
router.route('/auth/resetPassword/:token').patch(adminResetPassword);
router.route('/logout').get(adminLogout);

module.exports = router;