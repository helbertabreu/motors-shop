import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Post } from "../../entities/post.entity";

export const deletePostService = (postId: string): void => {
  const postrepository = AppDataSource.getRepository(Post);

  const post = postrepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
      images: true,
    },
  });

  postrepository.delete(postId);
};
