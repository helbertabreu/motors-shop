import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

export const authTokenSendEmailService = async (token: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    resetPasswordToken: token,
  });

  if (!user) {
    throw new AppError("Invalid token", 400);
  }
};
