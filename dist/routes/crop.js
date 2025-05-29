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
router.post("/your/expense/:cropId", auth_1.isLoggedIn, crop_1.addYourExpense);
// add partner expense 
router.post("/partner/expense/:cropId", auth_1.isLoggedIn, crop_1.addPartnerExpense);
// add your taken money 
router.post("/your/money/:cropId", auth_1.isLoggedIn, crop_1.addYourTakenMoney);
// add partner taken money 
router.post("/partner/money/:cropId", auth_1.isLoggedIn, crop_1.addPartnerTakenMoney);
// add sales 
router.post("/sale/:cropId", auth_1.isLoggedIn, crop_1.addSale);
// Get all crop records
router.get("/", auth_1.isLoggedIn, crop_1.getAllCrops);
// Get a single crop record by ID
router.get("/:cropId", auth_1.isLoggedIn, crop_1.getCropById);
// Update a crop record by ID
router.put("/:cropId", auth_1.isLoggedIn, crop_1.updateCrop);
// Delete a crop record by ID
router.delete("/:cropId", auth_1.isLoggedIn, crop_1.deleteCrop);
exports.default = router;
