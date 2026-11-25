"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const validation_1 = require("../../../lib/validation/validation");
const user_dto_1 = require("../dto/user.dto");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
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
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
