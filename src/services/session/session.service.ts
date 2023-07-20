import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { ISession } from "../../interfaces/session.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";

export const sessionService = async (sessionData: ISession) => {
  const userRepository = AppDataSource.getRepository(User);

  const existsUser = await userRepository.findOne({
    where: {
      email: sessionData.email,
    },
  });

  if (!existsUser) {
    throw new AppError("Email or password invalid", 403);
  }

  const validatedPassword = await compare(
    sessionData.password,
    existsUser.password
  );

  if (!validatedPassword) {
    throw new AppError("Email or password invalid", 403);
  }

  const token = jwt.sign(
    { typeOfAccount: existsUser.typeOfAccount },
    process.env.SECRET_KEY,
    { expiresIn: "24h", subject: existsUser.id }
  );

  return token;
};
