import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { validate as uuidValidate } from "uuid";
import { IPostResponse } from "../../interfaces/post.interface";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { postResponseSerializer } from "../../serializers/post.serializers";

export const delistPostService = async (
  postId: string,
  userId: string
): Promise<IPostResponse> => {
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  if (!uuidValidate(postId)) {
    throw new AppError("Invalid Id", 400);
  }

  const existsPost = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
      images: true,
    },
  });

  const existsUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!existsPost) {
    throw new AppError("Post not found", 404);
  }

  if (!existsUser) {
    throw new AppError("User not found", 404);
  }

  if (existsPost.user.id !== userId) {
    throw new AppError("You don't have authorization", 401);
  }

  const delistPost = postRepository.create({
    ...existsPost,
    isActive: !existsPost.isActive,
  });

  await postRepository.save(delistPost);

  const postResponse = postResponseSerializer.validate(delistPost, {
    stripUnknown: true,
  });

  return postResponse;
};
