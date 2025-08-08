"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSales = exports.deletePartnerTakenMoney = exports.deleteYourTakenMoney = exports.deleteSharedExpenses = exports.deletePartnerExpense = exports.deleteYourExpense = exports.deleteCrop = exports.updateSales = exports.addSale = exports.updatePartnerTakenMoney = exports.addPartnerTakenMoney = exports.updateYourTakenMoney = exports.addYourTakenMoney = exports.updateSharedExpenses = exports.addSharedExpenses = exports.updatePartnerExpense = exports.addPartnerExpense = exports.updateYourExpense = exports.addYourExpense = exports.updateCrop = exports.getCropById = exports.getAllCrops = exports.createCrop = void 0;
const crop_1 = require("../models/crop");
(async () => {
    // const crop = await Crop.findByIdAndUpdate("689590469fc9303aa96cc1bc",{updatedAt: new Date()},{new: true});
    // // const crop = await Crop.updateMany({},{updatedAt: new Date()},{new: true});
    // console.log((crop as any)?.updatedAt);
})();
const createCrop = async (req, res) => {
    try {
        const crop = await crop_1.Crop.create({ ...req.body, user: req.user._id });
        res.status(201).json({ crop });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating crop record", error });
    }
};
exports.createCrop = createCrop;
const getAllCrops = async (req, res) => {
    try {
        const crops = await crop_1.Crop.find().sort({ updatedAt: -1 }).lean();
        res.status(200).json({ crops });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching crops", error });
    }
};
exports.getAllCrops = getAllCrops;
const getCropById = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findById(req.params.cropId);
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching crop", error });
    }
};
exports.getCropById = getCropById;
const updateCrop = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, req.body, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.updateCrop = updateCrop;
const addYourExpense = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { yourExpenses: req.body }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addYourExpense = addYourExpense;
const updateYourExpense = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "yourExpenses._id": expenseId,
        }, {
            $set: {
                "yourExpenses.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updateYourExpense = updateYourExpense;
const addPartnerExpense = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { partnerExpenses: req.body }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addPartnerExpense = addPartnerExpense;
const updatePartnerExpense = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "partnerExpenses._id": expenseId,
        }, {
            $set: {
                "partnerExpenses.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updatePartnerExpense = updatePartnerExpense;
const addSharedExpenses = async (req, res) => {
    try {
        if (req.body.initialPayer === "both" && (Number(req.body.youPaid) + Number(req.body.partnerPaid)) !== Number(req.body.amount)) {
            throw new Error("Your And Partner Amount Does not match with total Amount");
        }
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { sharedExpenses: req.body }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addSharedExpenses = addSharedExpenses;
const updateSharedExpenses = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "sharedExpenses._id": expenseId,
        }, {
            $set: {
                "sharedExpenses.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updateSharedExpenses = updateSharedExpenses;
const addYourTakenMoney = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { yourTakenMoney: req.body }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addYourTakenMoney = addYourTakenMoney;
const updateYourTakenMoney = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "yourTakenMoney._id": expenseId,
        }, {
            $set: {
                "yourTakenMoney.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updateYourTakenMoney = updateYourTakenMoney;
const addPartnerTakenMoney = async (req, res) => {
    try {
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { partnerTakenMoney: req.body }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addPartnerTakenMoney = addPartnerTakenMoney;
const updatePartnerTakenMoney = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "partnerTakenMoney._id": expenseId,
        }, {
            $set: {
                "partnerTakenMoney.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updatePartnerTakenMoney = updatePartnerTakenMoney;
const addSale = async (req, res) => {
    try {
        if (req.body.cashHolder === "both" && (Number(req.body.amountYouHold) + Number(req.body.amountPartnerHold)) !== Number(req.body.amount)) {
            throw new Error("Your And Partner Amount Does not match with total Amount");
        }
        const crop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, {
            $push: { sales: { ...req.body } }
        }, { new: true, runValidators: true });
        if (!crop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ crop });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating crop", error });
    }
};
exports.addSale = addSale;
const updateSales = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const updateData = req.body;
        const crop = await crop_1.Crop.findOneAndUpdate({
            _id: cropId,
            "sales._id": expenseId,
        }, {
            $set: {
                "sales.$": { _id: expenseId, ...updateData },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.updateSales = updateSales;
const deleteCrop = async (req, res) => {
    try {
        const deletedCrop = await crop_1.Crop.findByIdAndDelete(req.params.cropId);
        if (!deletedCrop) {
            throw new Error("Crop not found");
        }
        res.status(200).json({ message: "Crop deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting crop", error });
    }
};
exports.deleteCrop = deleteCrop;
const deleteYourExpense = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                yourExpenses: { _id: expenseId },
            },
        }, { new: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deleteYourExpense = deleteYourExpense;
const deletePartnerExpense = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                partnerExpenses: { _id: expenseId },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deletePartnerExpense = deletePartnerExpense;
const deleteSharedExpenses = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                sharedExpenses: { _id: expenseId },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deleteSharedExpenses = deleteSharedExpenses;
const deleteYourTakenMoney = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                yourTakenMoney: { _id: expenseId },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deleteYourTakenMoney = deleteYourTakenMoney;
const deletePartnerTakenMoney = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                partnerTakenMoney: { _id: expenseId },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deletePartnerTakenMoney = deletePartnerTakenMoney;
const deleteSales = async (req, res) => {
    try {
        const { cropId, expenseId } = req.params;
        const crop = await crop_1.Crop.findOneAndUpdate({ _id: cropId }, {
            $pull: {
                sales: { _id: expenseId },
            },
        }, { new: true, runValidators: true });
        res.status(200).json({ crop });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating partner expense", error });
    }
};
exports.deleteSales = deleteSales;
