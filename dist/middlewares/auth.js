"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = async (req, res, next) => {
    try {
        // check token first in cookies
        // let token = req.cookies.token;
        let token = undefined;
        // if token not found in cookies, check if header contains Auth field
        if (!token && req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
        }
        if (!token) {
            throw new Error("login to access this resource");
        }
        let jwtData = '';
        try {
            jwtData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            throw new Error("Invalid JSON Token");
        }
        if (!jwtData) {
            throw new Error("token has been expired");
        }
        req.user = jwtData.user;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.isLoggedIn = isLoggedIn;
const isAuthorized = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(res.status(401).json({
                success: false,
                message: `user wuth ${req.user.role} role can't access this resource`
            }));
        }
        next();
    };
};
exports.isAuthorized = isAuthorized;
