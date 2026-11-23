import { Types } from "mongoose";
import { IPost } from "../interface/post.interface";
import postRepository, { PostRepository } from "../repository/post.repository";
import userRepository, {
  UserRepository,
} from "../../user/repository/user.repository";

import {
  noPost,
  unAuthorisedPostDelete,
  unAuthorisedPostUpdate,
  unVerifiedNotAllowed,
} from "../errors";
import { userNotExist } from "../../user/errors";
export class PostService {
  private readonly postRepository: PostRepository = postRepository;
  private readonly userRepository: UserRepository = userRepository;

  constructor() {}

  async createPost(postData: IPost) {
    const user = await this.userRepository.getOne({ _id: postData.userId });
    if (!user) throw userNotExist;
    if (!user.isVerified) throw unVerifiedNotAllowed;
    const createdPost = await this.postRepository.create(postData);
    return createdPost;
  }
  async deletePost(postId: Types.ObjectId, userId: Types.ObjectId) {
    const post = await this.postRepository.getOne({ _id: postId });
    if (!post) throw noPost;
    if (post.userId != userId) throw unAuthorisedPostDelete;

    await this.postRepository.delete(postId);
  }
  async getPost(postId: Types.ObjectId) {
    const post = await this.postRepository.getOne({ _id: postId });
    if (!post) throw noPost;
    return post;
  }
  async getAllUserPosts(userId: Types.ObjectId) {
    const post = await this.postRepository.getAll({ userId: userId });
    return post;
  }
  async updatePost(
    postId: Types.ObjectId,
    updatedData: Partial<IPost>,
    userId: Types.ObjectId,
  ) {
    const post = await this.postRepository.getOne({ _id: postId });
    if (!post) throw noPost;
    if (post.userId != userId) throw unAuthorisedPostUpdate;
    const updatedPost = await this.postRepository.update(
      { _id: postId },
      updatedData,
      { returnDocument: "after" },
    );
    return updatedPost;
  }
}
export default new PostService();
