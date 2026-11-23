import { Types } from "mongoose";
import { IComment } from "../interface/comment.interface";
import commentRepository, {
  CommentRepository,
} from "../repository/comment.repository";
import userRepository, {
  UserRepository,
} from "../../user/repository/user.repository";

import postRepository, {
  PostRepository,
} from "../../post/repository/post.repository";

import {
  noComment,
  noCommentAllowed,
  unAuthorisedCommentDelete,
  unAuthorisedCommentUpdate,
  unVerifiedNotAllowed,
} from "../errors";
import { userNotExist } from "../../user/errors";
import { noPost } from "../../post/errors";
export class CommentService {
  private readonly commentRepository: CommentRepository = commentRepository;
  private readonly userRepository: UserRepository = userRepository;
  private readonly postRepository: PostRepository = postRepository;

  constructor() {}

  async createComment(commentData: IComment) {
    const user = await this.userRepository.getOne({ _id: commentData.userId });
    if (!user) throw userNotExist;
    if (!user.isVerified) throw unVerifiedNotAllowed;
    const post = await this.postRepository.getOne({ _id: commentData.postId });
    if (!post) throw noPost;
    if (!post.allowComments) throw noCommentAllowed;
    const createdComment = await this.commentRepository.create(commentData);
    return createdComment;
  }
  async deleteComment(commentId: Types.ObjectId, userId: Types.ObjectId) {
    const comment = await this.commentRepository.getOne({ _id: commentId });
    if (!comment) throw noComment;
    if (comment.userId != userId) throw unAuthorisedCommentDelete;

    await this.commentRepository.delete(commentId);
  }
  async getComment(commentId: Types.ObjectId) {
    const comment = await this.commentRepository.getOne({ _id: commentId });
    if (!comment) throw noComment;
    return comment;
  }
  async getAllPostComments(postId: Types.ObjectId) {
    const comments = await this.commentRepository.getAll({ postId: postId });
    return comments;
  }
  async updateComment(
    commentId: Types.ObjectId,
    updatedData: Partial<IComment>,
    userId: Types.ObjectId,
  ) {
    const comment = await this.commentRepository.getOne({ _id: commentId });
    if (!comment) throw noComment;
    if (comment.userId != userId) throw unAuthorisedCommentUpdate;
    const updatedComment = await this.commentRepository.update(
      { _id: commentId },
      updatedData,
      { returnDocument: "after" },
    );
    return updatedComment;
  }
}
export default new CommentService();
