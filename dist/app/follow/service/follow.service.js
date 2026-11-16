"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const errors_1 = require("../../user/errors");
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const errors_2 = require("../errors");
const follow_repository_1 = __importDefault(require("../repository/follow.repository"));
class FollowService {
    followRepository = follow_repository_1.default;
    userRepository = user_repository_1.default;
    constructor() { }
    async followUser(data) {
        const checkFollow = await this.followRepository.getOne(data);
        if (checkFollow)
            throw errors_2.followExists;
        if (data.followerId === data.followingId)
            throw errors_2.noFollowYourself;
        const checkFollower = await this.userRepository.getOne({
            _id: data.followerId,
        });
        if (!checkFollower)
            throw errors_1.userNotExist;
        const follow = await this.followRepository.create(data);
        return follow;
    }
    async unfollowUser(data) {
        const checkFollow = await this.followRepository.getOne(data);
        if (!checkFollow)
            throw errors_2.NoFollowExists;
        await this.followRepository.delete(checkFollow._id);
    }
}
exports.FollowService = FollowService;
exports.default = new FollowService();
