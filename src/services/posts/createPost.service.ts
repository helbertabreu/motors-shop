import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Image } from "../../entities/image.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { IPostRequest } from "../../interfaces/post.interface";
import { postResponseSerializer } from "../../serializers/post.serializers";

export const createPostService = async (postData: IPostRequest, user) => {
  const imageRepository = AppDataSource.getRepository(Image);
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const existsUser = await userRepository.findOneBy({
    id: user.id,
  });

  if (!existsUser) {
    throw new AppError("User not found", 404);
  }

  const images = postData.images;
  const price = parseInt(postData.price);
  const priceFiper = parseInt(postData.tablePriceFiper);
  const percentageValue = 92;

  const post = {
    ...postData,
    isGoodPurchase: false,
  };

  if ((price / priceFiper) * 100 > percentageValue) {
    post.isGoodPurchase = false;
  } else {
    post.isGoodPurchase = true;
  }

  const newPost = postRepository.create({
    ...post,
    user: existsUser,
  });

  const savedPost = await postRepository.save(newPost);

  if (images) {
    let imagesResponse = await Promise.all(
      images.map(async (img) => {
        const newImage = imageRepository.create({
          imageLink: img.imageLink,
          post: savedPost,
        });
        await imageRepository.save(newImage);
        return newImage;
      })
    );
    savedPost.images = imagesResponse;
  }

  const postResponse = await postResponseSerializer.validate(newPost, {
    stripUnknown: true,
  });

  return postResponse;
};
