"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowController = void 0;
const follow_service_1 = __importDefault(require("../service/follow.service"));
const validation_1 = require("../../../lib/validation/validation");
const follow_dto_1 = require("../dto/follow.dto");
class FollowController {
    followService = follow_service_1.default;
    constructor() { }
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
}
exports.FollowController = FollowController;
exports.default = new FollowController();
