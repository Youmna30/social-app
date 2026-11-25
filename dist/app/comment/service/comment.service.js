"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_repository_1 = require("../repository/comment.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const post_repository_1 = require("../../post/repository/post.repository");
const errors_1 = require("../errors");
const errors_2 = require("../../user/errors");
const errors_3 = require("../../post/errors");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let CommentService = class CommentService {
    commentRepository;
    userRepository;
    postRepository;
    constructor(commentRepository, userRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
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
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.CommentRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.TOKENS.PostRepository)),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository, user_repository_1.UserRepository, post_repository_1.PostRepository])
], CommentService);
