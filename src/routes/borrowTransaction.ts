import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getAllTransactionsOfUser,
} from '../controllers/borrowTransaction';

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/user/:userId', getAllTransactionsOfUser);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
