import { inject, injectable } from "tsyringe";
import { userNotExist } from "../errors";
import { IUser } from "../interface/user.interface";
import { UserRepository } from "../repository/user.repository";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class UserService {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(id: string) {
    const user = await this.userRepository.getOne({ _id: id });
    if (!user) throw userNotExist;
    return user;
  }

  async updateProfile(id: string, updateData: Partial<IUser>) {
    const user = await this.userRepository.getOne({ _id: id });
    if (!user) throw userNotExist;
    const updatedUser = await this.userRepository.update(
      { _id: id },
      updateData,
      { returnDocument: "after" },
    );
    return updatedUser;
  }
  async changePrivacy(id: string) {
    const user = await this.userRepository.getOne({ _id: id });
    const updatedUser = await this.userRepository.update(
      { _id: id },
      { isPrivate: !user?.isPrivate },
      { returnDocument: "after" },
    );
    return updatedUser;
  }
  async search(data: Partial<IUser>) {
    const filter: Record<string, unknown> = { ...data };
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
