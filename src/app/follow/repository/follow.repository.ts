import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IFollow } from "../Interface/follow.interface";
import { Follow } from "../model/follow.model";

export class FollowRepository extends AbstractRepository<IFollow> {
  constructor() {
    super(Follow as unknown as Model<IFollow>);
  }
}

export default new FollowRepository();
