import { Request, Response } from "express";
import {
  IUserForgotPasswordRequest,
  IUserRecoveryPasswordRequest,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/user.interface";
import { createUserService } from "../services/user/createUser.service";
import { listUserByIdService } from "../services/user/listUserById.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { updateUserService } from "../services/user/updateUser.service";
import { resetPasswordUserService } from "../services/user/resetPasswordUser.service";
import { resetPasswordByTokenService } from "../services/user/resetPasswordByToken,service";
import { authTokenSendEmailService } from "../services/user/authTokenSendEmail.service";

export const createUserController = async (req: Request, res: Response) => {
  console.log("aqui");
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const listUserByIdController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const foundUser = await listUserByIdService(userId);

  return res.status(200).json(foundUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await deleteUserService(userId);

  return res.status(204).json();
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const userId: string = req.user.id;

  const newData = await updateUserService(userId, userData);

  return res.status(200).json(newData);
};

export const resetPasswordUserController = async (
  req: Request,
  res: Response
) => {
  const userData: IUserRecoveryPasswordRequest = req.body;
  await resetPasswordUserService(userData);

  return res
    .status(200)
    .json({ message: "Email de recuperação enviado com sucesso" });
};

export const resetPasswordByTokenController = async (
  req: Request,
  res: Response
) => {
  const token: string = req.params.token;
  const userData: IUserForgotPasswordRequest = req.body;
  await resetPasswordByTokenService(token, userData);

  return res.status(200).json({ message: "Senha atualizada com sucesso" });
};

export const authTokenSendEmailController = async (
  req: Request,
  res: Response
) => {
  const token = req.params.token;
  await authTokenSendEmailService(token);

  return res.status(200).json({ message: "Token autenticado" });
};
