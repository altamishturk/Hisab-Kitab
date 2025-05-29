"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCrop = exports.addSale = exports.addYourExpense = exports.updateCrop = exports.getCropById = exports.getAllCrops = exports.createCrop = void 0;
const crop_1 = require("../models/crop");
// (async () => {
//   const s = await Crop.find().populate("user");
//   console.log(s);
// })()
const createCrop = async (req, res) => {
    try {
        const crop = await crop_1.Crop.create(req.body);
        res.status(201).json({ crop });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating crop record", error });
    }
};
exports.createCrop = createCrop;
const getAllCrops = async (req, res) => {
    try {
        // console.log((req as any));
        const crops = await crop_1.Crop.find();
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
        const updatedCrop = await crop_1.Crop.findByIdAndUpdate(req.params.cropId, req.body, { new: true, runValidators: true });
        if (!updatedCrop) {
            throw new Error("Crop not found");
        }
        res.status(200).json(updatedCrop);
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
const addSale = async (req, res) => {
    try {
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
