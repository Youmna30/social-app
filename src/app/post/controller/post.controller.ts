import { NextFunction, Request, Response } from "express";
import postService, { PostService } from "../service/post.service";
import { Validator } from "../../../lib/validation/validation";
import { createPostDto, updatePostDto, validatePostId } from "../dto/post.dto";
import { Types } from "mongoose";

export class PostController {
  private readonly postService: PostService = postService;
  constructor() {}

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = Validator.validate(createPostDto, req.body);
      const postData = { ...body, userId: req.user?.id as Types.ObjectId };
      const post = await this.postService.createPost(postData);
      res.status(201).send({
        message: "Post created Successfully",
        post,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedData = Validator.validate(updatePostDto, req.body);

      const updatedPost = await this.postService.updatePost(
        updatedData.postId as unknown as Types.ObjectId,
        updatedData,
        req.user?.id,
      );
      res.status(200).send({
        message: "Post updated Successfully",
        post: updatedPost,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = Validator.validate(validatePostId, {
        postId: req.params.id,
      });

      await this.postService.deletePost(
        validateData.postId as unknown as Types.ObjectId,
        req.user?.id,
      );
      res.status(200).send({
        message: "Post deleted Successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = Validator.validate(validatePostId, {
        postId: req.params.id,
      });

      const post = await this.postService.getPost(
        validateData.postId as unknown as Types.ObjectId,
      );
      res.status(200).send({
        message: "Post is retrieved Successfully",
        post,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getAllUserPosts(req.user?.id);
      res.status(200).send({
        message: "Posts are retrieved Successfully",
        posts,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default new PostController();
