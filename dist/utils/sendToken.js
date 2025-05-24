"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken = async (req, res, next, user) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
    const options = {
        expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * process.env.JWT_EXPITY),
        httpOnly: true,
    };
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};
exports.sendToken = sendToken;
