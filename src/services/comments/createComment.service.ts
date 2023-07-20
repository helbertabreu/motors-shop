import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { validate as uuidValidate } from "uuid";
import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comment.interface";
import { Comment } from "../../entities/comment.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";

export const createCommentService = async (
  commentData: ICommentRequest,
  userId: string,
  postId
): Promise<ICommentResponse> => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  if (!uuidValidate(postId)) {
    throw new AppError("Invalid id", 400);
  }

  const foundUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const existsPost = await postRepository.findOneBy({
    id: postId,
  });

  if (!existsPost) {
    throw new AppError("Post not found", 404);
  }

  const comment = commentRepository.create({
    ...commentData,
    post: existsPost,
    userCommentId: foundUser.id,
    userComment: foundUser.name,
  });

  await commentRepository.save(comment);

  return { ...comment, post: existsPost.id };
};
