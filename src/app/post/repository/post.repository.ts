import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IPost } from "../interface/post.interface";
import { Post } from "../model/post.model";

export class PostRepository extends AbstractRepository<IPost> {
  constructor() {
    super(Post as unknown as Model<IPost>);
  }
}
export default new PostRepository();
