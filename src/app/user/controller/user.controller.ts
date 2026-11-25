import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { Validator } from "../../../lib/validation/validation";
import { updateUserDTO } from "../dto/user.dto";
import { IUser } from "../interface/user.interface";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class UserController {
  constructor(@inject(TOKENS.UserService) private userService: UserService) {}

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const user = await this.userService.getProfile(userId);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const updateData: Partial<IUser> = Validator.validate(
        updateUserDTO,
        req.body,
      );
      const updatedUser = await this.userService.updateProfile(
        userId,
        updateData,
      );
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      next(error);
    }
  };
  changePrivacy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const updatedUser = await this.userService.changePrivacy(userId);
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Your Account privacy changed successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataParams: Partial<IUser> = req.query;
      const users = await this.userService.search(dataParams);
      res.status(200).json({
        success: true,
        data: users,
        message: "Users retreived successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
