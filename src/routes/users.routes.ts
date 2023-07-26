import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  authTokenSendEmailController,
  createUserController,
  deleteUserController,
  listUserByIdController,
  resetPasswordByTokenController,
  updateUserController,
} from "../controllers/users.controller";
import {
  userForgotPasswordSerializer,
  userRecoveryPasswordSerializer,
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
userRoutes.get("/profile/:id", listUserByIdController);

userRoutes.post(
  "/forgot",
  ensureDataIsValidMiddleware(userRecoveryPasswordSerializer),
  resetPasswordByTokenController
);
userRoutes.post(
  "/reset/:token",
  ensureDataIsValidMiddleware(userForgotPasswordSerializer),
  resetPasswordByTokenController
);
userRoutes.get("/authentication/:token", authTokenSendEmailController);
