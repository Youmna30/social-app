"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_repository_1 = __importDefault(require("../repository/post.repository"));
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const errors_1 = require("../errors");
const errors_2 = require("../../user/errors");
class PostService {
    postRepository = post_repository_1.default;
    userRepository = user_repository_1.default;
    constructor() { }
    async createPost(postData) {
        const user = await this.userRepository.getOne({ _id: postData.userId });
        if (!user)
            throw errors_2.userNotExist;
        if (!user.isVerified)
            throw errors_1.unVerifiedNotAllowed;
        const createdPost = await this.postRepository.create(postData);
        return createdPost;
    }
    async deletePost(postId, userId) {
        const post = await this.postRepository.getOne({ _id: postId });
        if (!post)
            throw errors_1.noPost;
        if (post.userId != userId)
            throw errors_1.unAuthorisedPostDelete;
        await this.postRepository.delete(postId);
    }
    async getPost(postId) {
        const post = await this.postRepository.getOne({ _id: postId });
        if (!post)
            throw errors_1.noPost;
        return post;
    }
    async getAllUserPosts(userId) {
        const post = await this.postRepository.getAll({ userId: userId });
        return post;
    }
    async updatePost(postId, updatedData, userId) {
        const post = await this.postRepository.getOne({ _id: postId });
        if (!post)
            throw errors_1.noPost;
        if (post.userId != userId)
            throw errors_1.unAuthorisedPostUpdate;
        const updatedPost = await this.postRepository.update({ _id: postId }, updatedData, { returnDocument: "after" });
        return updatedPost;
    }
}
exports.PostService = PostService;
exports.default = new PostService();
