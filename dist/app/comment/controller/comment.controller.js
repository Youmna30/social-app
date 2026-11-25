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
exports.CommentController = void 0;
const comment_service_1 = require("../service/comment.service");
const validation_1 = require("../../../lib/validation/validation");
const comment_dto_1 = require("../dto/comment.dto");
const post_dto_1 = require("../../post/dto/post.dto");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../lib/di/tokens");
let CommentController = class CommentController {
    commentService;
    constructor(commentService) {
        this.commentService = commentService;
    }
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
};
exports.CommentController = CommentController;
exports.CommentController = CommentController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.CommentService)),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
