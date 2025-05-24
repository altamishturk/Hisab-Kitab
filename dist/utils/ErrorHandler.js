"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errorhandler = void 0;
class Errorhandler extends Error {
    constructor(code, message) {
        super(message);
        // this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.Errorhandler = Errorhandler;
