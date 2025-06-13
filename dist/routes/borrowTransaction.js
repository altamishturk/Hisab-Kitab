"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowTransaction_1 = require("../controllers/borrowTransaction");
const router = express_1.default.Router();
router.post('/', borrowTransaction_1.createTransaction);
router.get('/', borrowTransaction_1.getAllTransactions);
router.get('/user/:userId', borrowTransaction_1.getAllTransactionsOfUser);
router.get('/:id', borrowTransaction_1.getTransactionById);
router.put('/:id', borrowTransaction_1.updateTransaction);
router.delete('/:id', borrowTransaction_1.deleteTransaction);
exports.default = router;
