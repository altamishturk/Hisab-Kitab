"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const user_1 = require("../models/user");
const express_validator_1 = require("express-validator");
const sendToken_1 = require("../utils/sendToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }
        const userExists = await user_1.User.findOne({ email: req.body.email });
        if (userExists) {
            return next(res.status(404).json({
                success: false,
                message: 'user is already exists with this email'
            }));
        }
        let user = new user_1.User(req.body);
        if (!user) {
            return next(res.status(404).json({
                success: false,
                message: 'could not create account'
            }));
        }
        // save hashed password 
        await user.hashIt(req.body.password);
        await user.save();
        // send token to the user in response 
        (0, sendToken_1.sendToken)(req, res, next, user);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const user = await user_1.User.findOne({ email: req.body.email });
        if (!user) {
            return next(res.status(404).json({
                success: false,
                message: 'Email or Password Does not match'
            }));
        }
        const isAuthenticate = await bcrypt_1.default.compare(req.body.password, user.passwordhash);
        if (!isAuthenticate) {
            return next(res.status(404).json({
                success: false,
                message: 'Email or Password Does not match'
            }));
        }
        // send token to the user in response 
        (0, sendToken_1.sendToken)(req, res, next, user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        //clear the cookie
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        //send JSON response for success
        res.status(200).json({
            succes: true,
            message: "Logout success",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.logout = logout;
