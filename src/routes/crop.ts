import express from "express";
import {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
  addYourExpense,
  addSale,
} from "../controllers/crop";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

// Create a new crop record
router.post("/", isLoggedIn , createCrop);

// add your expense 
router.post("/your/expense/:cropId", isLoggedIn , addYourExpense);

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
