import express from "express";
import {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
  addYourExpense,
  addSale,
  addPartnerExpense,
  addYourTakenMoney,
  addPartnerTakenMoney,
  addSharedExpenses,
  updatePartnerExpense,
  updateYourExpense,
  updateYourTakenMoney,
  updatePartnerTakenMoney,
  updateSales,
  updateSharedExpenses,
  deleteYourExpense,
  deletePartnerExpense,
  deleteSales,
  deletePartnerTakenMoney,
  deleteYourTakenMoney,
  deleteSharedExpenses,
} from "../controllers/crop";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

// Create a new crop record
router.post("/", isLoggedIn , createCrop);

// add your expense 
router.post("/your-expense/:cropId", isLoggedIn , addYourExpense);

// add partner expense 
router.post("/partner-expense/:cropId", isLoggedIn , addPartnerExpense);

// add shared-expense
router.post("/shared-expense/:cropId", isLoggedIn , addSharedExpenses);

// add your taken money 
router.post("/your-taken-money/:cropId", isLoggedIn , addYourTakenMoney);

// add partner taken money 
router.post("/partner-taken-money/:cropId", isLoggedIn , addPartnerTakenMoney);

// add sales 
router.post("/sale/:cropId", isLoggedIn , addSale);

// Get all crop records
router.get("/", isLoggedIn , getAllCrops);

// Get a single crop record by ID
router.get("/:cropId", isLoggedIn, getCropById);

// Update a crop record by ID
router.put("/:cropId",isLoggedIn , updateCrop);

// update your expense 
router.put("/:cropId/your-expense/:expenseId",isLoggedIn , updateYourExpense);

// update partner expense 
router.put("/:cropId/partner-expense/:expenseId",isLoggedIn , updatePartnerExpense);

// update other expense 
router.put("/:cropId/shared-expense/:expenseId",isLoggedIn , updateSharedExpenses);

// update your taken money 
router.put("/:cropId/your-taken-money/:expenseId",isLoggedIn , updateYourTakenMoney);

// update partner taken money 
router.put("/:cropId/partner-taken-money/:expenseId",isLoggedIn , updatePartnerTakenMoney);

// update sales
router.put("/:cropId/sale/:expenseId",isLoggedIn , updateSales);

// Delete a crop record by ID
router.delete("/:cropId",isLoggedIn , deleteCrop);


// update your expense 
router.delete("/:cropId/your-expense/:expenseId",isLoggedIn , deleteYourExpense);

// update partner expense 
router.delete("/:cropId/partner-expense/:expenseId",isLoggedIn , deletePartnerExpense);

// update other expense 
router.delete("/:cropId/shared-expense/:expenseId",isLoggedIn , deleteSharedExpenses);

// update your taken money 
router.delete("/:cropId/your-taken-money/:expenseId",isLoggedIn , deleteYourTakenMoney);

// update partner taken money 
router.delete("/:cropId/partner-taken-money/:expenseId",isLoggedIn , deletePartnerTakenMoney);

// update sales
router.delete("/:cropId/sale/:expenseId",isLoggedIn , deleteSales);


export default router;
