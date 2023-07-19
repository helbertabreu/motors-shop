import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Post } from "../../entities/post.entity";
import { IPostResponse } from "../../interfaces/post.interface";
import { listPostSerializer } from "../../serializers/post.serializers";

export const listAllPostsService = async (): Promise<IPostResponse[]> => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository.find({
    where: { isActive: true },
    relations: {
      user: true,
      images: true,
    },
  });

  if (posts.length == 0) {
    throw new AppError("There is no registered ad yet", 200);
  }

  const postsResponse = await listPostSerializer.validate(posts, {
    stripUnknown: true,
  });

  return postsResponse;
};
