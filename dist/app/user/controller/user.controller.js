"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
const validation_1 = require("../../../lib/validation/validation");
const user_dto_1 = require("../dto/user.dto");
class UserController {
    userService = user_service_1.default;
    constructor() { }
    getProfile = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const user = await this.userService.getProfile(userId);
            res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const updateData = validation_1.Validator.validate(user_dto_1.updateUserDTO, req.body);
            const updatedUser = await this.userService.updateProfile(userId, updateData);
            res.status(200).json({ success: true, data: updatedUser });
        }
        catch (error) {
            next(error);
        }
    };
    changePrivacy = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const updatedUser = await this.userService.changePrivacy(userId);
            res.status(200).json({
                success: true,
                data: updatedUser,
                message: "Your Account privacy changed successfully",
            });
        }
        catch (error) {
            next(error);
        }
    };
    searchUsers = async (req, res, next) => {
        try {
            const dataParams = req.query;
            const users = await this.userService.search(dataParams);
            res.status(200).json({
                success: true,
                data: users,
                message: "Users retreived successfully",
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = new UserController();
