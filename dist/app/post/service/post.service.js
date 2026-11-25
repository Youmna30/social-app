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
exports.PostService = void 0;
const post_repository_1 = require("../repository/post.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const errors_1 = require("../errors");
const errors_2 = require("../../user/errors");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let PostService = class PostService {
    postRepository;
    userRepository;
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
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
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.PostRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __metadata("design:paramtypes", [post_repository_1.PostRepository, user_repository_1.UserRepository])
], PostService);
