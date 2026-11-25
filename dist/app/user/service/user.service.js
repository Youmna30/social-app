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
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const errors_1 = require("../errors");
const user_repository_1 = require("../repository/user.repository");
const tokens_1 = require("../../../lib/di/tokens");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(id) {
        const user = await this.userRepository.getOne({ _id: id });
        if (!user)
            throw errors_1.userNotExist;
        return user;
    }
    async updateProfile(id, updateData) {
        const user = await this.userRepository.getOne({ _id: id });
        if (!user)
            throw errors_1.userNotExist;
        const updatedUser = await this.userRepository.update({ _id: id }, updateData, { returnDocument: "after" });
        return updatedUser;
    }
    async changePrivacy(id) {
        const user = await this.userRepository.getOne({ _id: id });
        const updatedUser = await this.userRepository.update({ _id: id }, { isPrivate: !user?.isPrivate }, { returnDocument: "after" });
        return updatedUser;
    }
    async search(data) {
        const filter = { ...data };
        if (data.username) {
            filter.username = {
                $regex: data.username,
                $options: "i",
            };
        }
        if (data.email) {
            filter.email = data.email;
        }
        if (data.username) {
            filter.username = {
                $regex: data.username,
                $options: "i",
            };
        }
        const users = await this.userRepository.getAll(filter);
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
