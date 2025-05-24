"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        // console.log(process.env.URL);
        await mongoose_1.default.connect(process.env.URL);
        console.log('connected to the database successfully');
    }
    catch (error) {
        console.log(error);
        console.log('could not connect to the database');
    }
};
exports.connect = connect;
