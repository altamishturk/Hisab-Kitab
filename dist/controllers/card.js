"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVillages = exports.getCards = exports.addGaveMoney = exports.addReceivedMoney = exports.createCard = void 0;
const card_1 = require("../models/card");
const fetchVillageNames_1 = require("../utils/fetchVillageNames");
const createCard = async (req, res, next) => {
    try {
        const card = await card_1.Card.create({ name: "Altamish", giftGiverInfo: { name: req.body.giverName, village: req.body.giverVillage } });
        res.status(201).json({
            success: true,
            message: "",
            card
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        });
    }
};
exports.createCard = createCard;
const addReceivedMoney = async (req, res, next) => {
    try {
        const card = await card_1.Card.findByIdAndUpdate(req.params.cardId, {
            $push: { giftReceived: { date: new Date(), spouseName: req.body.spouseName, amount: req.body.amount } }
        }, { new: true });
        res.status(201).json({
            success: true,
            message: "",
            card
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        });
    }
};
exports.addReceivedMoney = addReceivedMoney;
const addGaveMoney = async (req, res, next) => {
    try {
        const card = await card_1.Card.findByIdAndUpdate(req.params.cardId, {
            $push: { giftsWeGave: { date: new Date(), spouseName: req.body.spouseName, amount: req.body.amount } }
        }, { new: true });
        res.status(201).json({
            success: true,
            message: "",
            card
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        });
    }
};
exports.addGaveMoney = addGaveMoney;
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const getCards = async (req, res, next) => {
    try {
        const safeSearch = escapeRegex(req.query.searchTerm);
        const query = {};
        if (req.query.searchTerm) {
            query.$or = [
                { 'giftGiverInfo.name': { $regex: safeSearch, $options: 'i' } },
                { 'giftGiverInfo.village': { $regex: safeSearch, $options: 'i' } }
            ];
        }
        const cards = await card_1.Card.find(query);
        const villages = await (0, fetchVillageNames_1.fetchVillageNames)();
        res.status(201).json({
            success: true,
            message: "",
            cards,
            villages
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ""
        });
    }
};
exports.getCards = getCards;
const getVillages = async (req, res, next) => {
    try {
        const villages = await (0, fetchVillageNames_1.fetchVillageNames)();
        res.status(201).json({
            success: true,
            message: "",
            villages
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        });
    }
};
exports.getVillages = getVillages;
