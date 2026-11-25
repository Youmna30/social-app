import { NextFunction, Request, Response } from "express";
import { FollowService } from "../service/follow.service";
import { Validator } from "../../../lib/validation/validation";
import { followDto } from "../dto/follow.dto";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class FollowController {
  constructor(
    @inject(TOKENS.FollowService) private readonly followService: FollowService,
  ) {}

  follow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followData = Validator.validate(followDto, req.body);
      const createdFollow = await this.followService.followUser({
        ...followData,
        followingId: req.user?.id,
      });
      return res.status(201).json({
        message: "Follow done successfully",
        success: true,
        data: createdFollow,
      });
    } catch (error) {
      next(error);
    }
  };
  unFollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followData = Validator.validate(followDto, req.body);
      await this.followService.unfollowUser({
        ...followData,
        followingId: req.user?.id,
      });
      return res.status(201).json({
        message: "Unfollow done successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
