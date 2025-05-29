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
} from "../controllers/crop";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

// Create a new crop record
router.post("/", isLoggedIn , createCrop);

// add your expense 
router.post("/your/expense/:cropId", isLoggedIn , addYourExpense);

// add partner expense 
router.post("/partner/expense/:cropId", isLoggedIn , addPartnerExpense);

// add your taken money 
router.post("/your/money/:cropId", isLoggedIn , addYourTakenMoney);

// add partner taken money 
router.post("/partner/money/:cropId", isLoggedIn , addPartnerTakenMoney);

// add sales 
router.post("/sale/:cropId", isLoggedIn , addSale);

// Get all crop records
router.get("/", isLoggedIn , getAllCrops);

// Get a single crop record by ID
router.get("/:cropId", isLoggedIn, getCropById);

// Update a crop record by ID
router.put("/:cropId",isLoggedIn , updateCrop);

// Delete a crop record by ID
router.delete("/:cropId",isLoggedIn , deleteCrop);


export default router;
