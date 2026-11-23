import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IComment } from "../interface/comment.interface";
import { Comment } from "../model/comment.model";

export class CommentRepository extends AbstractRepository<IComment> {
  constructor() {
    super(Comment as unknown as Model<IComment>);
  }
}

export default new CommentRepository();
