import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { createUserService } from "../services/user/createUser.service";
import { listUserByIdService } from "../services/user/listUserById.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { updateUserService } from "../services/user/updateUser.service";

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
