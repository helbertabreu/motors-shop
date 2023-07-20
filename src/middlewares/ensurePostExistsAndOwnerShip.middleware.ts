import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";
import { AppError } from "../errors/appError";

export const ensurePostExistsAndOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postRepository = AppDataSource.getRepository(Post);

  const postId = req.params.id;
  const userId = req.user.id;

  const post = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
    },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const user = post.user.id;

  if (userId !== user) {
    throw new AppError("You don't have authorization", 401);
  }

  return next();
};
