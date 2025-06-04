"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crop_1 = require("../controllers/crop");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Create a new crop record
router.post("/", auth_1.isLoggedIn, crop_1.createCrop);
// add your expense 
router.post("/your-expense/:cropId", auth_1.isLoggedIn, crop_1.addYourExpense);
// add partner expense 
router.post("/partner-expense/:cropId", auth_1.isLoggedIn, crop_1.addPartnerExpense);
// add shared-expense
router.post("/shared-expense/:cropId", auth_1.isLoggedIn, crop_1.addSharedExpenses);
// add your taken money 
router.post("/your-taken-money/:cropId", auth_1.isLoggedIn, crop_1.addYourTakenMoney);
// add partner taken money 
router.post("/partner-taken-money/:cropId", auth_1.isLoggedIn, crop_1.addPartnerTakenMoney);
// add sales 
router.post("/sale/:cropId", auth_1.isLoggedIn, crop_1.addSale);
// Get all crop records
router.get("/", auth_1.isLoggedIn, crop_1.getAllCrops);
// Get a single crop record by ID
router.get("/:cropId", auth_1.isLoggedIn, crop_1.getCropById);
// Update a crop record by ID
router.put("/:cropId", auth_1.isLoggedIn, crop_1.updateCrop);
// update your expense 
router.put("/:cropId/your-expense/:expenseId", auth_1.isLoggedIn, crop_1.updateYourExpense);
// update partner expense 
router.put("/:cropId/partner-expense/:expenseId", auth_1.isLoggedIn, crop_1.updatePartnerExpense);
// update other expense 
router.put("/:cropId/shared-expense/:expenseId", auth_1.isLoggedIn, crop_1.updateSharedExpenses);
// update your taken money 
router.put("/:cropId/your-taken-money/:expenseId", auth_1.isLoggedIn, crop_1.updateYourTakenMoney);
// update partner taken money 
router.put("/:cropId/partner-taken-money/:expenseId", auth_1.isLoggedIn, crop_1.updatePartnerTakenMoney);
// update sales
router.put("/:cropId/sale/:expenseId", auth_1.isLoggedIn, crop_1.updateSales);
// Delete a crop record by ID
router.delete("/:cropId", auth_1.isLoggedIn, crop_1.deleteCrop);
// update your expense 
router.delete("/:cropId/your-expense/:expenseId", auth_1.isLoggedIn, crop_1.deleteYourExpense);
// update partner expense 
router.delete("/:cropId/partner-expense/:expenseId", auth_1.isLoggedIn, crop_1.deletePartnerExpense);
// update other expense 
router.delete("/:cropId/shared-expense/:expenseId", auth_1.isLoggedIn, crop_1.deleteSharedExpenses);
// update your taken money 
router.delete("/:cropId/your-taken-money/:expenseId", auth_1.isLoggedIn, crop_1.deleteYourTakenMoney);
// update partner taken money 
router.delete("/:cropId/partner-taken-money/:expenseId", auth_1.isLoggedIn, crop_1.deletePartnerTakenMoney);
// update sales
router.delete("/:cropId/sale/:expenseId", auth_1.isLoggedIn, crop_1.deleteSales);
exports.default = router;
