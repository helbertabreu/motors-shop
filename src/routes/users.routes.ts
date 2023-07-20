import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  updateUserController,
} from "../controllers/users.controller";
import {
  userRequestSerializer,
  userUpdateSerializer,
} from "../serializers/user.serializers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSerializer),
  createUserController
);
userRoutes.get("/profile", ensureAuthMiddleware, listUserByIdController);
userRoutes.delete("/profile", ensureAuthMiddleware, deleteUserController);
userRoutes.patch(
  "/profile",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);
