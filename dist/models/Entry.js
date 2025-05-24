"use strict";
// src/models/LifeEntry.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['expense', 'goal', 'habit', 'emotion', 'note', 'task', 'other'],
        required: true,
    },
    title: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    tags: [String],
    metadata: { type: mongoose_1.Schema.Types.Mixed }, // dynamic data (e.g. { mood: "happy" } or { priority: "high" })
}, { timestamps: true });
exports.Entry = (0, mongoose_1.model)('Entry', EntrySchema);
