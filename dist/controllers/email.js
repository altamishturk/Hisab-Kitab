"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const sendEmail_1 = require("../utils/sendEmail");
const sendEmail = async (req, res, next) => {
    const data = await (0, sendEmail_1.sendEmail)("altamishpasha@gmail.com", "Enquery", JSON.stringify(req.body));
    res.status(200).json({
        success: true,
        message: "___",
        ...data
    });
};
exports.sendEmail = sendEmail;
