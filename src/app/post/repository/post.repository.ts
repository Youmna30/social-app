import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IPost } from "../interface/post.interface";
import { Post } from "../model/post.model";
import { injectable } from "tsyringe";

@injectable()
export class PostRepository extends AbstractRepository<IPost> {
  constructor() {
    super(Post as unknown as Model<IPost>);
  }
}
