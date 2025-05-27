"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVillages = exports.getCards = exports.addGaveMoney = exports.addReceivedMoney = exports.editCard = exports.createCard = void 0;
const card_1 = require("../models/card");
const fetchVillageNames_1 = require("../utils/fetchVillageNames");
// (async () => {
//     const w = await Card.findByIdAndDelete("683403696c1f1028d8f265fb");
//     console.log(w);
// })()     
const createCard = async (req, res, next) => {
    try {
        const card = await card_1.Card.create({ user: req.user._id, name: "Altamish", giftGiverInfo: { name: req.body.giverName, village: req.body.giverVillage } });
        if (!isNaN(Number(req.body.reveivedMoney)) && Number(req.body.reveivedMoney) !== 0) {
            card.giftReceived.push({ date: new Date(), spouseName: req.body.spouseName, amount: Number(req.body.reveivedMoney) });
            await card.save();
        }
        if (!isNaN(Number(req.body.reveivedGave)) && Number(req.body.reveivedGave) !== 0) {
            card.giftsWeGave.push({ date: new Date(), spouseName: req.body.spouseName, amount: Number(req.body.reveivedGave) });
            await card.save();
        }
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
const editCard = async (req, res, next) => {
    try {
        const card = await card_1.Card.findByIdAndUpdate(req.params.cardId, {
            giftGiverInfo: {
                name: req.body.giverName,
                village: req.body.giverVillage
            }
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
exports.editCard = editCard;
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
    return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}
const getCards = async (req, res, next) => {
    try {
        const safeSearch = escapeRegex(req.query.searchTerm);
        let query = {};
        if (req.query.searchTerm) {
            query.$or = [
                { 'giftGiverInfo.name': { $regex: safeSearch, $options: 'i' } },
                { 'giftGiverInfo.village': { $regex: safeSearch, $options: 'i' } }
            ];
        }
        if (req.query.searchTerm === "{all}") {
            query = {};
        }
        const cards = await card_1.Card.find(query).sort({ createdAt: -1 });
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
