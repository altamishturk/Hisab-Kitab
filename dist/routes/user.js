"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { check } = require('express-validator');
let signupvalidation = [
    check('firstname')
        .isLength({ min: 3 })
        .withMessage('first name must be at least 3 chars long'),
    check('lastname')
        .isLength({ min: 3 })
        .withMessage('last name must be at least 3 chars long'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({ min: 3 })
        .withMessage('password must be at least 3 chars long')
];
// router.get('/loggedinuser', isLoggedIn,getLoggedInUser)
// router.post('/', signupvalidation ,signup)
// router.post('/login', login)
// router.post('/logout', isLoggedIn,logout)
exports.default = router;
