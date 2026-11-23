"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = __importDefault(require("../service/post.service"));
const validation_1 = require("../../../lib/validation/validation");
const post_dto_1 = require("../dto/post.dto");
class PostController {
    postService = post_service_1.default;
    constructor() { }
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
            res.status(201).send({
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
            res.status(201).send({
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
            res.status(201).send({
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
            res.status(201).send({
                message: "Posts are retrieved Successfully",
                posts,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.PostController = PostController;
exports.default = new PostController();
