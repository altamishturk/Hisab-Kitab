"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const card_1 = require("../controllers/card");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoggedIn, card_1.getCards);
router.get("/villages", auth_1.isLoggedIn, card_1.getVillages);
router.post("/", auth_1.isLoggedIn, card_1.createCard);
router.put("/:cardId", auth_1.isLoggedIn, card_1.editCard); // edit card
router.post("/add/receive/:cardId", auth_1.isLoggedIn, card_1.addReceivedMoney);
router.post("/add/gave/:cardId", auth_1.isLoggedIn, card_1.addGaveMoney);
exports.default = router;
