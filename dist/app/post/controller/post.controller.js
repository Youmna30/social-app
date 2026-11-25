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
exports.PostController = void 0;
const post_service_1 = require("../service/post.service");
const validation_1 = require("../../../lib/validation/validation");
const post_dto_1 = require("../dto/post.dto");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let PostController = class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    createPost = async (req, res, next) => {
        try {
            const body = validation_1.Validator.validate(post_dto_1.createPostDto, req.body);
            const postData = { ...body, userId: req.user?.id };
            const post = await this.postService.createPost(postData);
            res.status(201).send({
                message: "Post created Successfully",
                post,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    updatePost = async (req, res, next) => {
        try {
            const updatedData = validation_1.Validator.validate(post_dto_1.updatePostDto, req.body);
            const updatedPost = await this.postService.updatePost(updatedData.postId, updatedData, req.user?.id);
            res.status(200).send({
                message: "Post updated Successfully",
                post: updatedPost,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    deletePost = async (req, res, next) => {
        try {
            const validateData = validation_1.Validator.validate(post_dto_1.validatePostId, {
                postId: req.params.id,
            });
            await this.postService.deletePost(validateData.postId, req.user?.id);
            res.status(200).send({
                message: "Post deleted Successfully",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getPost = async (req, res, next) => {
        try {
            const validateData = validation_1.Validator.validate(post_dto_1.validatePostId, {
                postId: req.params.id,
            });
            const post = await this.postService.getPost(validateData.postId);
            res.status(200).send({
                message: "Post is retrieved Successfully",
                post,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getUserPosts = async (req, res, next) => {
        try {
            const posts = await this.postService.getAllUserPosts(req.user?.id);
            res.status(200).send({
                message: "Posts are retrieved Successfully",
                posts,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.PostController = PostController;
exports.PostController = PostController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.PostService)),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
