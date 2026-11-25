import { Model } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IComment } from "../interface/comment.interface";
import { Comment } from "../model/comment.model";
import { injectable } from "tsyringe";

@injectable()
export class CommentRepository extends AbstractRepository<IComment> {
  constructor() {
    super(Comment as unknown as Model<IComment>);
  }
}
