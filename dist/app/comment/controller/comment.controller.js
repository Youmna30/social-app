"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = __importDefault(require("../service/comment.service"));
const validation_1 = require("../../../lib/validation/validation");
const comment_dto_1 = require("../dto/comment.dto");
const post_dto_1 = require("../../post/dto/post.dto");
class CommentController {
    commentService = comment_service_1.default;
    constructor() { }
    createComment = async (req, res, next) => {
        try {
            const body = validation_1.Validator.validate(comment_dto_1.createCommentDto, req.body);
            const commentData = { ...body, userId: req.user?.id };
            const comment = await this.commentService.createComment(commentData);
            res.status(201).send({
                message: "Comment created Successfully",
                comment,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    updateComment = async (req, res, next) => {
        try {
            const updatedData = validation_1.Validator.validate(comment_dto_1.updateCommentDto, req.body);
            const updatedComment = await this.commentService.updateComment(updatedData.commentId, updatedData, req.user?.id);
            res.status(200).send({
                message: "Comment updated Successfully",
                comment: updatedComment,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    deleteComment = async (req, res, next) => {
        try {
            const validateData = validation_1.Validator.validate(comment_dto_1.validateCommentId, {
                commentId: req.params.id,
            });
            await this.commentService.deleteComment(validateData.commentId, req.user?.id);
            res.status(200).send({
                message: "comment deleted Successfully",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getComment = async (req, res, next) => {
        try {
            const validateData = validation_1.Validator.validate(comment_dto_1.validateCommentId, {
                commentId: req.params.id,
            });
            const comment = await this.commentService.getComment(validateData.commentId);
            res.status(200).send({
                message: "Comment is retrieved Successfully",
                comment,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getPostComments = async (req, res, next) => {
        try {
            const validateData = validation_1.Validator.validate(post_dto_1.validatePostId, {
                postId: req.params.postId,
            });
            const comments = await this.commentService.getAllPostComments(validateData.postId);
            res.status(200).send({
                message: "Comments are retrieved Successfully",
                comments,
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.CommentController = CommentController;
exports.default = new CommentController();
