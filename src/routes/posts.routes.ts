import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  postRequestSerializer,
  postUpdateSerializer,
} from "../serializers/post.serializers";
import {
  createPostController,
  deletePostController,
  delistPostController,
  listAllPostsController,
  listPostByIdController,
  updatePostController,
} from "../controllers/posts.controller";
import { ensurePostExistsAndOwnershipMiddleware } from "../middlewares/ensurePostExistsAndOwnerShip.middleware";
import { ensureTokenIsOwnerPostMiddleware } from "../middlewares/ensureTokenIsOwnerPost.middleware";
import { commentRequestSerializer } from "../serializers/comment.serializer";
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comments.controller";

export const postsRoutes = Router();

postsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(postRequestSerializer),
  createPostController
);

postsRoutes.get("", listAllPostsController);
postsRoutes.get("/:id", listPostByIdController);

postsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensurePostExistsAndOwnershipMiddleware,
  deletePostController
);

postsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureTokenIsOwnerPostMiddleware,
  ensureDataIsValidMiddleware(postUpdateSerializer),
  updatePostController
);
postsRoutes.patch("/:id/delist", ensureAuthMiddleware, delistPostController);

// Comments routes
postsRoutes.post(
  "/:id/comments",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentController
);

postsRoutes.delete(
  "/comments/:id",
  ensureAuthMiddleware,
  deleteCommentController
);

postsRoutes.patch(
  "/comments/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController
);
