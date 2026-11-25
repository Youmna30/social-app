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
exports.FollowService = void 0;
const tsyringe_1 = require("tsyringe");
const errors_1 = require("../../user/errors");
const user_repository_1 = require("../../user/repository/user.repository");
const errors_2 = require("../errors");
const follow_repository_1 = require("../repository/follow.repository");
const tokens_1 = require("../../../lib/di/tokens");
let FollowService = class FollowService {
    followRepository;
    userRepository;
    constructor(followRepository, userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }
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
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.FollowRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __metadata("design:paramtypes", [follow_repository_1.FollowRepository, user_repository_1.UserRepository])
], FollowService);
