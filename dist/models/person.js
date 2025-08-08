"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const mongoose_1 = require("mongoose");
const PersonSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, lowercase: true, trim: true },
    email: { type: String },
    phoneNumber: { type: String },
}, { timestamps: true });
exports.Person = (0, mongoose_1.model)('person', PersonSchema);
