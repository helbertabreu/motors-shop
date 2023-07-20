import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

export const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  userRepository.delete(userId);
};
