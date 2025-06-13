"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowTransaction = void 0;
const mongoose_1 = require("mongoose");
const BorrowTransactionSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    from: { type: mongoose_1.Schema.ObjectId, ref: "person" },
    to: { type: mongoose_1.Schema.ObjectId, ref: "person" },
    description: { type: String, default: '' },
    borrowedAt: { type: Date, required: true },
}, {
    timestamps: true, // adds createdAt and updatedAt
});
exports.BorrowTransaction = (0, mongoose_1.model)('BorrowTransaction', BorrowTransactionSchema);
