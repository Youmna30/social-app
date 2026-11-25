import { NextFunction, Request, Response } from "express";
import { CommentService } from "../service/comment.service";
import { Validator } from "../../../lib/validation/validation";
import {
  createCommentDto,
  updateCommentDto,
  validateCommentId,
} from "../dto/comment.dto";
import { Types } from "mongoose";
import { validatePostId } from "../../post/dto/post.dto";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";

@injectable()
export class CommentController {
  constructor(
    @inject(TOKENS.CommentService)
    private readonly commentService: CommentService,
  ) {}

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = Validator.validate(createCommentDto, req.body);
      const commentData = { ...body, userId: req.user?.id as Types.ObjectId };
      const comment = await this.commentService.createComment(commentData);
      res.status(201).send({
        message: "Comment created Successfully",
        comment,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedData = Validator.validate(updateCommentDto, req.body);

      const updatedComment = await this.commentService.updateComment(
        updatedData.commentId as unknown as Types.ObjectId,
        updatedData,
        req.user?.id,
      );
      res.status(200).send({
        message: "Comment updated Successfully",
        comment: updatedComment,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = Validator.validate(validateCommentId, {
        commentId: req.params.id,
      });

      await this.commentService.deleteComment(
        validateData.commentId as unknown as Types.ObjectId,
        req.user?.id,
      );
      res.status(200).send({
        message: "comment deleted Successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = Validator.validate(validateCommentId, {
        commentId: req.params.id,
      });

      const comment = await this.commentService.getComment(
        validateData.commentId as unknown as Types.ObjectId,
      );
      res.status(200).send({
        message: "Comment is retrieved Successfully",
        comment,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getPostComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = Validator.validate(validatePostId, {
        postId: req.params.postId,
      });
      const comments = await this.commentService.getAllPostComments(
        validateData.postId as unknown as Types.ObjectId,
      );
      res.status(200).send({
        message: "Comments are retrieved Successfully",
        comments,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
