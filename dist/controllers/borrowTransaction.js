"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getAllTransactionsOfUser = exports.getAllTransactions = exports.createTransaction = void 0;
const borrowTransaction_1 = require("../models/borrowTransaction");
// ✅ Create a new borrow transaction
const createTransaction = async (req, res) => {
    try {
        const { amount, from, to, description, borrowedAt } = req.body;
        const transaction = new borrowTransaction_1.BorrowTransaction({
            amount,
            from,
            to,
            description,
            borrowedAt,
        });
        const saved = await transaction.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create transaction', error });
    }
};
exports.createTransaction = createTransaction;
// ✅ Get all transactions
const getAllTransactions = async (_req, res) => {
    try {
        const transactions = await borrowTransaction_1.BorrowTransaction.find()
            .populate('from', 'name email phoneNumber') // populate person info
            .populate('to', 'name email phoneNumber')
            .sort({ borrowedAt: -1 });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
};
exports.getAllTransactions = getAllTransactions;
// ✅ Get all transactions
const getAllTransactionsOfUser = async (_req, res) => {
    try {
        const transactions = await borrowTransaction_1.BorrowTransaction.find({
            $or: [
                { from: _req.params.userId },
                { to: _req.params.userId },
            ]
        }).sort({ borrowedAt: -1 });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
};
exports.getAllTransactionsOfUser = getAllTransactionsOfUser;
// ✅ Get a transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await borrowTransaction_1.BorrowTransaction.findById(id)
            .populate('from', 'name email phoneNumber')
            .populate('to', 'name email phoneNumber');
        if (!transaction) {
            throw new Error("Transaction not found");
            // if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch transaction', error });
    }
};
exports.getTransactionById = getTransactionById;
// ✅ Update a transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await borrowTransaction_1.BorrowTransaction.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updated) {
            throw new Error("Transaction not found");
            // if (!updated) return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update transaction', error });
    }
};
exports.updateTransaction = updateTransaction;
// ✅ Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await borrowTransaction_1.BorrowTransaction.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error("Transaction not found");
            // if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete transaction', error });
    }
};
exports.deleteTransaction = deleteTransaction;
