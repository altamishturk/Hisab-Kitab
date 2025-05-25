"use strict";
// src/models/LifeEntry.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "Robina",
    },
    giftReceived: [{
            date: {
                type: Date
            },
            spouseName: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
    giftsWeGave: [{
            date: {
                type: Date
            },
            spouseName: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
    giftGiverInfo: {
        name: {
            type: String
        },
        village: {
            type: String
        }
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
exports.Card = (0, mongoose_1.model)('Entry', EntrySchema);
