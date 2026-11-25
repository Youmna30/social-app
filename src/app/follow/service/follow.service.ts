import { inject, injectable } from "tsyringe";
import { userNotExist } from "../../user/errors";
import { UserRepository } from "../../user/repository/user.repository";
import { followExists, NoFollowExists, noFollowYourself } from "../errors";
import { IFollow } from "../Interface/follow.interface";
import { FollowRepository } from "../repository/follow.repository";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class FollowService {
  constructor(
    @inject(TOKENS.FollowRepository)
    private readonly followRepository: FollowRepository,
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async followUser(data: IFollow) {
    const checkFollow = await this.followRepository.getOne(data);
    if (checkFollow) throw followExists;
    if (data.followerId === data.followingId) throw noFollowYourself;
    const checkFollower = await this.userRepository.getOne({
      _id: data.followerId,
    });
    if (!checkFollower) throw userNotExist;
    const follow = await this.followRepository.create(data);
    return follow;
  }
  async unfollowUser(data: IFollow) {
    const checkFollow = await this.followRepository.getOne(data);
    if (!checkFollow) throw NoFollowExists;
    await this.followRepository.delete(checkFollow._id);
  }
}
