import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IUser } from "../interface/user.interface";
import { User, UserDocument } from "../model/user.model";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User as unknown as Model<IUser>);
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }
}
