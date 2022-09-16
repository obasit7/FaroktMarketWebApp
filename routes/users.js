const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const flash = require('connect-flash');

const users = require('../controllers/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLogIn)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

//router.get('/register', users.renderRegister)

//router.post('/register', catchAsync(users.registerUser))

//router.get('/login', users.renderLogIn)

//router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router;
