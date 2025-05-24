"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timeSchema = new mongoose_1.default.Schema({
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    description: {
        type: String
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    image: {
        publicId: {
            type: String
        },
        url: {
            type: String
        }
    }
}, { timestamps: true });
exports.Time = mongoose_1.default.model('time', timeSchema);
