"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = void 0;
const getLoggedInUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'user fount',
            user: req.user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Server Error!"
        });
    }
};
exports.getLoggedInUser = getLoggedInUser;
