import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import { Post } from "../entities/post.entity";
import { validate } from "uuid";

export const ensureTokenIsOwnerPostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postRepository = AppDataSource.getRepository(Post);

  const postId = req.params.id;
  const validatedId = validate(postId);

  if (!validatedId) {
    throw new AppError("Invalid id", 400);
  }

  const foundPost = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
    },
  });

  if (!foundPost) {
    throw new AppError("Post not found", 404);
  }

  const userId = req.user.id;

  if (foundPost.user.id !== userId) {
    throw new AppError("Missing authorization", 403);
  }

  next();
};
