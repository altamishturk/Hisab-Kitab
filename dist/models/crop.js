"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crop = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ExpenseSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    description: { type: String, default: "" },
    note: { type: String, default: "" },
    paymentMode: { type: String, enum: ["online", "offline"], required: true },
    date: { type: Date, required: true },
});
const TakenMoneySchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    purpose: { type: String, required: true },
    note: { type: String, default: "" },
});
const SaleSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    soldTo: { type: String, required: true },
    soldBy: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: String, default: "" },
    paymentMode: { type: String, enum: ["online", "offline"], required: true },
    date: { type: Date, required: true },
});
const CropSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    partnerName: { type: String },
    yourName: { type: String, required: true },
    cropName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    partnershipType: {
        type: String,
        enum: ["solo", "partnered"],
        required: true
    },
    partnerExpenses: { type: [ExpenseSchema], default: [] },
    yourExpenses: { type: [ExpenseSchema], default: [] },
    yourTakenMoney: { type: [TakenMoneySchema], default: [] },
    partnerTakenMoney: { type: [TakenMoneySchema], default: [] },
    sales: { type: [SaleSchema], default: [] },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});
exports.Crop = mongoose_1.default.model("crop", CropSchema);
