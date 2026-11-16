"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const errors_1 = require("../errors");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class UserService {
    userRepository = user_repository_1.default;
    constructor() { }
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
}
exports.UserService = UserService;
exports.default = new UserService();
