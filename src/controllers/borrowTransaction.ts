import { Request, Response } from 'express';
import { BorrowTransaction } from '../models/borrowTransaction';

// ✅ Create a new borrow transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, from, to, description, borrowedAt } = req.body;

    const transaction = new BorrowTransaction({
      amount,
      from,
      to,
      description,
      borrowedAt,
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create transaction', error });
  }
};

// ✅ Get all transactions
export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await BorrowTransaction.find()
      .populate('from', 'name email phoneNumber') // populate person info
      .populate('to', 'name email phoneNumber')
      .sort({ borrowedAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
};

// ✅ Get all transactions
export const getAllTransactionsOfUser = async (_req: Request, res: Response) => {
  try {
    const transactions = await BorrowTransaction.find({
      $or: [
        {from: _req.params.userId},
        {to: _req.params.userId},
      ]
    }).sort({ borrowedAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
};

// ✅ Get a transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await BorrowTransaction.findById(id)
      .populate('from', 'name email phoneNumber')
      .populate('to', 'name email phoneNumber');

    if(!transaction){
        throw new Error("Transaction not found")
        // if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    }  
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transaction', error });
  }
};

// ✅ Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await BorrowTransaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if(!updated){
        throw new Error("Transaction not found")
        // if (!updated) return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update transaction', error });
  }
};

// ✅ Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await BorrowTransaction.findByIdAndDelete(id);

    if(!deleted){
        throw new Error("Transaction not found")
        // if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction', error });
  }
};
