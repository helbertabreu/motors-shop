import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Post } from "../../entities/post.entity";
import { IPostResponse } from "../../interfaces/post.interface";
import { postResponseSerializer } from "../../serializers/post.serializers";

export const listPostByIdService = async (
  postId: string
): Promise<IPostResponse> => {
  const postRepository = AppDataSource.getRepository(Post);

  const post = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
      images: true,
    },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const postResponse = await postResponseSerializer.validate(post, {
    stripUnknown: true,
  });

  return postResponse;
};
