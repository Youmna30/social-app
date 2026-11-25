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
exports.FollowController = void 0;
const follow_service_1 = require("../service/follow.service");
const validation_1 = require("../../../lib/validation/validation");
const follow_dto_1 = require("../dto/follow.dto");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let FollowController = class FollowController {
    followService;
    constructor(followService) {
        this.followService = followService;
    }
    follow = async (req, res, next) => {
        try {
            const followData = validation_1.Validator.validate(follow_dto_1.followDto, req.body);
            const createdFollow = await this.followService.followUser({
                ...followData,
                followingId: req.user?.id,
            });
            return res.status(201).json({
                message: "Follow done successfully",
                success: true,
                data: createdFollow,
            });
        }
        catch (error) {
            next(error);
        }
    };
    unFollow = async (req, res, next) => {
        try {
            const followData = validation_1.Validator.validate(follow_dto_1.followDto, req.body);
            await this.followService.unfollowUser({
                ...followData,
                followingId: req.user?.id,
            });
            return res.status(201).json({
                message: "Unfollow done successfully",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.FollowController = FollowController;
exports.FollowController = FollowController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.FollowService)),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
