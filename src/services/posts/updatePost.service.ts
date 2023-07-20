import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/image.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/appError";
import { IPostUpdate } from "../../interfaces/post.interface";
import { postResponseSerializer } from "../../serializers/post.serializers";

export const updatePostService = async (
  postData: IPostUpdate,
  userId: string,
  postId: string
) => {
  const postRepository = AppDataSource.getRepository(Post);
  const imagesRepository = AppDataSource.getRepository(Image);

  const { images, ...data } = postData;

  const post = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: {
      user: true,
      images: true,
      comments: true,
    },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (images) {
    let imagesResponse = await Promise.all(
      images.map(async (img) => {
        const newImage = imagesRepository.create({
          imageLink: img.imageLink,
          post: post,
        });
        await imagesRepository.save(newImage);
        return newImage;
      })
    );
    post.images = [...post.images, ...imagesResponse];
  }

  const updatedPost = postRepository.create({
    ...post,
    ...data,
  });

  await postRepository.save(updatedPost);

  const postResponse = postResponseSerializer.validate(updatedPost, {
    stripUnknown: true,
  });

  return postResponse;
};
