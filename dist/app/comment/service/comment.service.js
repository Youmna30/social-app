"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_repository_1 = __importDefault(require("../repository/comment.repository"));
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const post_repository_1 = __importDefault(require("../../post/repository/post.repository"));
const errors_1 = require("../errors");
const errors_2 = require("../../user/errors");
const errors_3 = require("../../post/errors");
class CommentService {
    commentRepository = comment_repository_1.default;
    userRepository = user_repository_1.default;
    postRepository = post_repository_1.default;
    constructor() { }
    async createComment(commentData) {
        const user = await this.userRepository.getOne({ _id: commentData.userId });
        if (!user)
            throw errors_2.userNotExist;
        if (!user.isVerified)
            throw errors_1.unVerifiedNotAllowed;
        const post = await this.postRepository.getOne({ _id: commentData.postId });
        if (!post)
            throw errors_3.noPost;
        if (!post.allowComments)
            throw errors_1.noCommentAllowed;
        const createdComment = await this.commentRepository.create(commentData);
        return createdComment;
    }
    async deleteComment(commentId, userId) {
        const comment = await this.commentRepository.getOne({ _id: commentId });
        if (!comment)
            throw errors_1.noComment;
        if (comment.userId != userId)
            throw errors_1.unAuthorisedCommentDelete;
        await this.commentRepository.delete(commentId);
    }
    async getComment(commentId) {
        const comment = await this.commentRepository.getOne({ _id: commentId });
        if (!comment)
            throw errors_1.noComment;
        return comment;
    }
    async getAllPostComments(postId) {
        const comments = await this.commentRepository.getAll({ postId: postId });
        return comments;
    }
    async updateComment(commentId, updatedData, userId) {
        const comment = await this.commentRepository.getOne({ _id: commentId });
        if (!comment)
            throw errors_1.noComment;
        if (comment.userId != userId)
            throw errors_1.unAuthorisedCommentUpdate;
        const updatedComment = await this.commentRepository.update({ _id: commentId }, updatedData, { returnDocument: "after" });
        return updatedComment;
    }
}
exports.CommentService = CommentService;
exports.default = new CommentService();
