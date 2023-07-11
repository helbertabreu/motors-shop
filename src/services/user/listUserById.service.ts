import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const removePasswordField = (user: User) => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const listUserByIdService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  return removePasswordField(foundUser);
};
