import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import crypto from "crypto";
import { User } from "../../entities/user.entity";
import { IUserRecoveryPasswordRequest } from "../../interfaces/user.interface";
import { sendResetPasswordEmail } from "../../utils/mailer";

export const resetPasswordUserService = async (
  userData: IUserRecoveryPasswordRequest
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!user) {
    throw new AppError("Email not found", 404);
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);

  await userRepository.save(user);

  await sendResetPasswordEmail(user.email, resetToken);
};
