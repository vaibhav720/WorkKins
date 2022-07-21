const express = require('express');
const { isAuthenticated, isAuthRole } = require('../middleware/auth');
const { clientSignUp, clientLogin, clientLogout, clientNews, getClientDetails, clientForgotPassword, editClientDetails, clientResetPassword } = require('../controller/clientController');

const router = express.Router();

router.route('/auth/signup').post(clientSignUp);
router.route('/auth/login').post(clientLogin);
router.route('/profile').get(isAuthenticated, isAuthRole(true), getClientDetails);
router.route('/clientNews').get(isAuthenticated, isAuthRole(true), getClientDetails);
router.route('/editProfile').patch(isAuthenticated,isAuthRole(true), editClientDetails);
router.route('/auth/forgotPassword').post(clientForgotPassword);
router.route('/auth/resetPassword/:token').patch(clientResetPassword);
router.route('/logout').get(clientLogout);

module.exports = router;