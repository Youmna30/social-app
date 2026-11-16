import { userNotExist } from "../../user/errors";
import userRepository, {
  UserRepository,
} from "../../user/repository/user.repository";
import { followExists, NoFollowExists, noFollowYourself } from "../errors";
import { IFollow } from "../Interface/follow.interface";
import followRepository, {
  FollowRepository,
} from "../repository/follow.repository";

export class FollowService {
  private readonly followRepository: FollowRepository = followRepository;
  private readonly userRepository: UserRepository = userRepository;
  constructor() {}
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

export default new FollowService();
