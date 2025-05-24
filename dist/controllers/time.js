"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTime = exports.updateDescriptionAndImageOfTime = exports.updateTime = exports.newTime = exports.getTimeById = exports.getTimes = exports.getpPaidTimes = exports.getUnpaidTimes = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const time_1 = require("../models/time");
const getUnpaidTimes = async (req, res, next) => {
    try {
        const times = await time_1.Time.find({ isPaid: false });
        res.status(200).json({
            success: true,
            message: "successfully fatched all Unpaid times",
            times
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.getUnpaidTimes = getUnpaidTimes;
const getpPaidTimes = async (req, res, next) => {
    try {
        const times = await time_1.Time.find({ isPaid: true });
        res.status(200).json({
            success: true,
            message: "successfully fatched all paid times",
            times
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.getpPaidTimes = getpPaidTimes;
const getTimes = async (req, res, next) => {
    try {
        let times;
        if (req.query.startDate) {
            times = await time_1.Time.find().where('startTime').gte(req.query.startDate).lte(req.query.endDate);
        }
        else {
            times = await time_1.Time.find();
        }
        res.status(200).json({
            success: true,
            message: "successfully fatched all times",
            times
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.getTimes = getTimes;
const getTimeById = async (req, res, next) => {
    try {
        const time = await time_1.Time.findById(req.params.id);
        if (!time) {
            throw new Error("time not found");
        }
        res.status(200).json({
            success: true,
            message: "successfully fatched time",
            time
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.getTimeById = getTimeById;
const newTime = async (req, res, next) => {
    try {
        const { startTime, endTime, description, image } = req.body;
        if (!startTime || !endTime) {
            throw new Error('start time and end times are required');
        }
        let time = undefined;
        if (image !== "null") {
            let data = await cloudinary_1.default.v2.uploader.upload(image, { folder: 'freelancing_times_images' });
            time = await time_1.Time.create({ startTime, endTime, description, image: { publicId: data.public_id, url: data.url } });
        }
        else {
            time = await time_1.Time.create({ startTime, endTime, description });
        }
        res.status(200).json({
            success: true,
            message: 'new time added successfully',
            time
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.newTime = newTime;
const updateTime = async (req, res, next) => {
    try {
        let { isPaid } = req.body;
        // console.log(req.body);
        let time = await time_1.Time.findById(req.params.id);
        if (!time) {
            return res.status(400).json({
                success: false,
                message: 'invalid id',
                time
            });
        }
        time.isPaid = isPaid;
        await time.save();
        res.status(200).json({
            success: true,
            message: 'time updated successfully',
            time
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.updateTime = updateTime;
const updateDescriptionAndImageOfTime = async (req, res, next) => {
    try {
        let time = await time_1.Time.findById(req.params.id);
        if (!time) {
            throw new Error('Invalid time Id');
        }
        if (!req.body.description) {
            throw new Error('description is required');
        }
        if (req.body.image[0] !== '[') {
            if (time.image) {
                await cloudinary_1.default.v2.uploader.destroy(time.image.publicId);
            }
            let data = await cloudinary_1.default.v2.uploader.upload(req.body.image, { folder: 'freelancing_times_images' });
            time.image = { publicId: data.public_id, url: data.url };
        }
        time.description = req.body.description;
        await time.save();
        res.status(200).json({
            success: true,
            message: 'time description updated successfully',
            time
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.updateDescriptionAndImageOfTime = updateDescriptionAndImageOfTime;
const deleteTime = async (req, res, next) => {
    try {
        const time = await time_1.Time.findById(req.params.id);
        if (!time) {
            throw new Error("Error");
        }
        if (!time.image) {
            await cloudinary_1.default.v2.uploader.destroy(time.image.publicId);
        }
        // await time();
        res.status(200).json({
            success: true,
            message: 'time deleted successfully',
            time
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.deleteTime = deleteTime;
