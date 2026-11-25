import { container } from "tsyringe";
import { TOKENS } from "./tokens";
import { UserService } from "../../app/user/service/user.service";
import { UserRepository } from "../../app/user/repository/user.repository";
import { UserController } from "../../app/user/controller/user.controller";
import { AuthService } from "../../app/auth/service/auth.service";
import { AuthController } from "../../app/auth/controller/auth.controller";
import { FollowService } from "../../app/follow/service/follow.service";
import { FollowRepository } from "../../app/follow/repository/follow.repository";
import { FollowController } from "../../app/follow/controller/follow.controller";
import { PostService } from "../../app/post/service/post.service";
import { PostController } from "../../app/post/controller/post.controller";
import { PostRepository } from "../../app/post/repository/post.repository";
import { cacheProvider } from "../cache/init";
import { mailjetProvider } from "../email/init";
import { CommentRepository } from "../../app/comment/repository/comment.repository";
import { CommentService } from "../../app/comment/service/comment.service";
import { CommentController } from "../../app/comment/controller/comment.controller";

container.registerSingleton<UserService>(TOKENS.UserService, UserService);
container.registerSingleton<UserRepository>(
  TOKENS.UserRepository,
  UserRepository,
);
container.registerSingleton<UserController>(
  TOKENS.UserController,
  UserController,
);
container.registerSingleton<AuthService>(TOKENS.AuthService, AuthService);
container.registerSingleton<AuthController>(
  TOKENS.AuthController,
  AuthController,
);

container.registerSingleton<FollowService>(TOKENS.FollowService, FollowService);
container.registerSingleton<FollowRepository>(
  TOKENS.FollowRepository,
  FollowRepository,
);
container.registerSingleton<FollowController>(
  TOKENS.FollowController,
  FollowController,
);
container.registerSingleton<PostService>(TOKENS.PostService, PostService);
container.registerSingleton<PostController>(
  TOKENS.PostController,
  PostController,
);
container.registerSingleton<PostRepository>(
  TOKENS.PostRepository,
  PostRepository,
);
container.registerSingleton<CommentRepository>(
  TOKENS.CommentRepository,
  CommentRepository,
);
container.registerSingleton<CommentService>(
  TOKENS.CommentService,
  CommentService,
);
container.registerSingleton<CommentController>(
  TOKENS.CommentController,
  CommentController,
);

container.registerInstance(TOKENS.CacheProvider, cacheProvider);
container.registerInstance(TOKENS.MailjetProvider, mailjetProvider);

export default container;
