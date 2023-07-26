import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import bcryptjs from "bcryptjs";
import { MoreThanOrEqual } from "typeorm";
import { IUserForgotPasswordRequest } from "../../interfaces/user.interface";

export const resetPasswordByTokenService = async (
  token: string,
  userData: IUserForgotPasswordRequest
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    resetPasswordToken: token,
    resetPasswordExpires: MoreThanOrEqual(new Date()),
  });

  if (!user) {
    throw new AppError("Invalid token", 400);
  }

  const newPassword = userData.password;

  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await userRepository.save(user);
};
